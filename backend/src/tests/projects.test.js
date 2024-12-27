import { describe, test, expect } from 'vitest';
import request from 'supertest';

import app from '@/app.js';

describe('Projects Endpoint', () => {
  test('GET /projects returns an array of projects', async () => {
    const response = await request(app).get('/projects');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});
