import { beforeAll, afterAll } from 'vitest';
import app from '@/app.js';

let server;

beforeAll(async () => {
  server = app.listen(3000);
});

afterAll(async () => {
  await server.close();
});
