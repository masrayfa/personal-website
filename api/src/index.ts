import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import engagement from './routes/engagement';
import { errorHandler } from './middleware/error.middleware';

const app = new Hono();

// Global middleware
app.use('*', logger());
app.use('*', cors());
app.use('*', errorHandler);

// Routes
app.get('/', (c) => {
  return c.json({
    success: true,
    message: 'API is running',
    version: '1.0.0',
  });
});

app.route('/engagement', engagement);

app.onError((err, c) => {
  console.error(`Error Occurred: ${err}`);
  return c.json(err);
});

// 404 handler
app.notFound((c) => {
  return c.json(
    {
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: 'Route not found',
      },
    },
    {
      status: 404,
    }
  );
});

export default {
  port: 8080,
  fetch: app.fetch,
};
