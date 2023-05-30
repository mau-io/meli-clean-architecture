import request from 'supertest';

import '#src/config/setEnv.js';
import { app } from '#src/index.js';

let server;

beforeAll(() => {
  server = app
    .getApp()
    .listen(3001);
});

afterAll((done) => {
  server.close(done);
});

const tokens = [
  {token: process.env.MELI_SERVICE_TOKEN, info: 'REAL'},
  {token: process.env.MELI_SERVICE_FAKE_TOKEN, info: 'MOCK TOKEN'}
];

const URL = '/api/v1/items';

const validIds = [
  'MLA1131352790',
  'MLA1342803605',
  'MLB2643485836',
  'MLM1836930578'
];

const invalidIds = [
  'MMM1131352790',
  'mLA1131352790',
  'MlA1131352790',
  'MLa1131352790',
  'MLA113135279',
  'MLA11313527900'
];

tokens.forEach(({token, info}) => {
  describe(`\x1b[34m GET ${URL}/:id with ${info} token: ${token} \x1b[0m`, () => {
    
    validIds.forEach((validId) => {
      it(`should return 200 and a response matching the schema when provided a valid ID ${validId}`, async() => {
    
        const response = await request(server)
          .get(`${URL}/${validId}`)
          .set('x-auth-token', token);
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('author');
        expect(response.body.author).toHaveProperty('name');
        expect(response.body.author).toHaveProperty('lastname');
        expect(response.body).toHaveProperty('item');
        expect(response.body.item).toHaveProperty('id');
        expect(response.body.item).toHaveProperty('title');
        expect(response.body.item).toHaveProperty('price');
        expect(response.body.item.price).toHaveProperty('currency');
        expect(response.body.item.price).toHaveProperty('amount');
        expect(response.body.item.price).toHaveProperty('decimals');
        expect(response.body.item).toHaveProperty('picture');
        expect(response.body.item).toHaveProperty('condition');
        expect(response.body.item).toHaveProperty('free_shipping');
        expect(response.body.item).toHaveProperty('sold_quantity');
        expect(response.body.item).toHaveProperty('description');
      });
    });

    invalidIds.forEach((invalidId) => {
      it(`should return 400 if the ID ${invalidId} is invalid`, async() => {
        const response = await request(server)
          .get(`${URL}/${invalidId}`)
          .set('x-auth-token', token);

        expect(response.status).toBe(400);
      });
    });

    it('should return 404 if the item does not exist', async() => {
      const response = await request(server)
        .get(`${URL}/MLA9999999999`)
        .set('x-auth-token', process.env.MELI_SERVICE_TOKEN);

      expect(response.status).toBe(404);
    });

    it('should return 401 if the token is invalid', async() => {
      const response = await request(server)
        .get(URL)
        .set('x-auth-token', '980740ba-7854-438e-a2fd-5123466b4b61');

      expect(response.status).toBe(401);
    });

    it('should return 401 if the token format is invalid', async() => {
      const response = await request(server)
        .get(URL)
        .set('x-auth-token', 'invalid_token');

      expect(response.status).toBe(401);
    });

    it('should return 401 if the token is missing', async() => {
      const response = await request(server)
        .get(URL);

      expect(response.status).toBe(401);
    });

    it('should return 404 if the id parameter is missing', async() => {
      const response = await request(server)
        .get(URL)
        .set('x-auth-token', token);

      expect(response.status).toBe(404);
    });
  
  });
});