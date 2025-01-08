import { beforeAll, afterAll } from 'vitest';
import app from '@/app';
import { Server } from 'http';

let server: Server;

beforeAll(async () => {
  server = app.listen(3000);
});

afterAll(() => {
  server.close();
});
