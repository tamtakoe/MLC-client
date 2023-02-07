export default {
  production: true,

  port: 8080, // Exposes HTTP_PORT (8080) in the DM Docker Mappings
  hostName: '0.0.0.0',

  cors: {
    allowedHeaders: ['Accept', 'Accept-Language', 'Content-Language', 'Content-Type', 'Authorization', 'name', 'x-compress'],
  },
  routes: {
    server: 'http://188.225.14.40:8067'
  },
  root: 'apps/web',
};
