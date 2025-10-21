import { Context, Hono } from 'hono';

const app = new Hono();

app.get('/:content_id/likes', (c: Context) => {
  return c.json('1123');
});

app.get('/:content_id/claps', (c: Context) => {
  return c.json('155');
});

export default app;
