import request from 'supertest';

import '#src/config/setEnv.js';
import { app } from '#src/index.js';

let server;

beforeAll(() => {
  server = app
    .getApp()
    .listen(3000);
});

afterAll((done) => {
  server.close(done);
});

const tokens = [
  {token: process.env.MELI_SERVICE_TOKEN, info: 'REAL'},
  {token: process.env.MELI_SERVICE_FAKE_TOKEN, info: 'MOCK TOKEN'}
];

const URL = '/api/v1/search';

tokens.forEach(({token, info}) => {
  describe(`\x1b[34m GET ${URL} with ${info} token: ${token} \x1b[0m`, () => {
    
    it('should return 200 and a response matching the schema when provided all valid parameters', async() => {
      
      const response = await request(server)
        .get(URL)
        .query({
          query: 'iphone',
          site: 'MLA',
          sort: 'price_asc',
          limit: 10,
          offset: 0
        })
        .set('x-auth-token', token);
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('paging');
      expect(response.body.paging).toHaveProperty('total');
      expect(response.body.paging).toHaveProperty('offset');
      expect(response.body.paging).toHaveProperty('limit');
      expect(response.body).toHaveProperty('categories');
      expect(response.body.categories).toBeInstanceOf(Array);
      expect(response.body).toHaveProperty('items');
      expect(response.body.items).toBeInstanceOf(Array);

      response.body.items.forEach(item => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('title');
        expect(item).toHaveProperty('price');
        expect(item.price).toHaveProperty('currency');
        expect(item.price).toHaveProperty('amount');
        expect(item.price).toHaveProperty('decimals');
        expect(item).toHaveProperty('picture');
        expect(item).toHaveProperty('condition');
        expect(item).toHaveProperty('free_shipping');
      });

    });

    it('should return 200 and a response matching the schema when provided only required parameters', async() => {
      const response = await request(server)
        .get(URL)
        .query({
          query: 'iphone',
          site: 'MLA',
        })
        .set('x-auth-token', token);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('paging');
      expect(response.body.paging).toHaveProperty('total');
      expect(response.body.paging).toHaveProperty('offset');
      expect(response.body.paging).toHaveProperty('limit');
      expect(response.body).toHaveProperty('categories');
      expect(response.body.categories).toBeInstanceOf(Array);
      expect(response.body).toHaveProperty('items');
      expect(response.body.items).toBeInstanceOf(Array);

      response.body.items.forEach(item => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('title');
        expect(item).toHaveProperty('price');
        expect(item.price).toHaveProperty('currency');
        expect(item.price).toHaveProperty('amount');
        expect(item.price).toHaveProperty('decimals');
        expect(item).toHaveProperty('picture');
        expect(item).toHaveProperty('condition');
        expect(item).toHaveProperty('free_shipping');
      });

    });
    it(`should sort data correctly when the ${info} token is used and sort parameter is "price_asc"`, async() => {
      const response = await request(server)
        .get(URL)
        .query({
          query: 'iphone',
          site: 'MLA',
          sort: 'price_asc',
        })
        .set('x-auth-token', token);

      expect(response.status).toBe(200);
      // Verifica que los items estén ordenados en orden ascendente por precio
      for(let i = 0;i < response.body.items.length - 1;i++) {
        expect(response.body.items[i].price.amount).toBeLessThanOrEqual(response.body.items[i + 1].price.amount);
      }
    });

    it(`should sort data correctly when the ${info} token is used and sort parameter is "price_desc"`, async() => {
      const response = await request(server)
        .get(URL)
        .query({
          query: 'iphone',
          site: 'MLA',
          sort: 'price_desc',
        })
        .set('x-auth-token', token);

      expect(response.status).toBe(200);
      // Verifica que los items estén ordenados en orden descendente por precio
      for (let i = 0;i < response.body.items.length - 1;i++) {
        expect(response.body.items[i].price.amount).toBeGreaterThanOrEqual(response.body.items[i + 1].price.amount);
      }
    });

    it(`should limit the number of results correctly when the ${info} token is used`, async() => {
      const limit = 5;
      const response = await request(server)
        .get(URL)
        .query({
          query: 'iphone',
          site: 'MLA',
          limit,
        })
        .set('x-auth-token', token);

      expect(response.status).toBe(200);
      expect(response.body.items.length).toBe(limit);
    });

    it('should paginate results correctly when offset is provided', async() => {
      const offset = 5;
      const firstResponse = await request(server)
        .get(URL)
        .query({
          query: 'iphone',
          site: 'MLA',
          offset
        })
        .set('x-auth-token', token);
    
      expect(firstResponse.status).toBe(200);
      expect(firstResponse.body.items[0].id).not.toBe(undefined);
    
      const secondResponse = await request(server)
        .get(URL)
        .query({
          query: 'iphone',
          site: 'MLA',
          offset: 0
        })
        .set('x-auth-token', token);
    
      expect(secondResponse.status).toBe(200);
      expect(secondResponse.body.items[offset].id).toEqual(firstResponse.body.items[0].id);
    });

    it('should return 401 if the token is invalid', async() => {
      const response = await request(server)
        .get(URL)
        .query({
          query: 'iphone',
          site: 'MLA',
        })
        .set('x-auth-token', '980740ba-7854-438e-a2fd-5123466b4b61');

      expect(response.status).toBe(401);
    });

    it('should return 401 if the token format is invalid', async() => {
      const response = await request(server)
        .get(URL)
        .query({
          query: 'iphone',
          site: 'MLA',
        })
        .set('x-auth-token', 'invalid_token');

      expect(response.status).toBe(401);
    });

    it('should return 401 if the token is missing', async() => {
      const response = await request(server)
        .get(URL)
        .query({
          query: 'iphone',
          site: 'MLA',
        });

      expect(response.status).toBe(401);
    });

    it('should return 400 if the query parameter is missing', async() => {
      const response = await request(server)
        .get(URL)
        .query({
          site: 'MLA'
        })
        .set('x-auth-token', token);

      expect(response.status).toBe(400);
    });

    it('should return 400 if the site parameter is missing', async() => {
      const response = await request(server)
        .get(URL)
        .query({
          query: 'iphone'
        })
        .set('x-auth-token', token);

      expect(response.status).toBe(400);
    });

    it('should return an error when a very large limit is provided', async() => {
      const response = await request(server)
        .get(URL)
        .query({
          query: 'iphone',
          site: 'MLA',
          limit: 10000
        })
        .set('x-auth-token', token);
    
      expect(response.status).toBe(400);
    });
    
    it('should return an error when a negative limit is provided', async() => {
      const response = await request(server)
        .get(URL)
        .query({
          query: 'iphone',
          site: 'MLA',
          limit: -1
        })
        .set('x-auth-token', token);
    
      expect(response.status).toBe(400);
    });
    
  });
});