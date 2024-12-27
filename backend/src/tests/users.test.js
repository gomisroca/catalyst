import { describe, test, expect } from 'vitest';
import request from 'supertest';

import app from '@/app.js';

describe('Users Endpoint', () => {
  test('GET /users returns 200 status code', async () => {
    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
    expect(response.text).toBe('Users Endpoint');
  });
});
