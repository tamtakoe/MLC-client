export default {
  production: true,

  port: 80, // Exposes HTTP_PORT (80) in the DM Docker Mappings
  hostName: '0.0.0.0',

  cors: {
    allowedHeaders: ['Accept', 'Accept-Language', 'Content-Language', 'Content-Type', 'Authorization', 'name', 'x-compress'],
  },
  root: 'apps/web',
};
