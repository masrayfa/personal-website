import { Hono } from 'hono';

import engagement from './routes/engagement';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.route('/engagement', engagement);

export default {
  port: 8080,
  fetch: app.fetch,
};
