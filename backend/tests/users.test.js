import { describe, beforeAll, afterAll, test, expect } from 'vitest';
import request from 'supertest';

import app from '@/app.js';

let server;

describe('Users Endpoint', () => {
  beforeAll(() => {
    server = app.listen(3000);
  });

  afterAll(() => {
    server.close();
  });

  test('GET /users returns 200 status code', async () => {
    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
    expect(response.text).toBe('Users Endpoint');
  });
});
