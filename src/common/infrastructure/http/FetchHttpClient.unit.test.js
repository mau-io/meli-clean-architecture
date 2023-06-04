import http from 'http';
import FetchHttpClient from './FetchHttpClient.js';
import {jest} from '@jest/globals';

describe('FetchHttpClient', () => {
  let server;
  let client;

  beforeAll(done => {
    server = http.createServer((req, res) => {
      res.setHeader('Content-Type', 'application/json');
      switch(req.url) {
      case '/success':
        res.statusCode = 200;
        res.end(JSON.stringify({message: 'Success'}));
        break;
      case '/error':
        res.statusCode = 400;
        res.end(JSON.stringify({message: 'Error'}));
        break;
      default:
        res.statusCode = 404;
        res.end(JSON.stringify({message: 'Not Found'}));
      }
    });

    server.listen(3333, done);
  });

  afterAll(done => {
    server.close(done);
  });

  beforeEach(() => {
    client = new FetchHttpClient('http://localhost:3333');
  });

  it('should return response data for successful requests', async() => {
    const {data} = await client.get('/success');
    expect(data).toEqual({message: 'Success'});
  });

  it('should throw HttpError for unsuccessful requests', async() => {
    await expect(client.get('/error')).rejects.toThrow('Error');
  });

  it('should throw HttpError for non-existent routes', async() => {
    await expect(client.get('/nonexistent')).rejects.toThrow('Not Found');
  });

  it('should timeout if the request takes too long', async() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(0);

    server.once('request', () => {
      jest.advanceTimersByTime(6000);
    });

    await expect(client.get('/success', { timeout: 5000 })).rejects.toThrow('Request timed out');
    jest.useRealTimers();
  });
});
