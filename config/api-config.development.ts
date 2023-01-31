export default {
  production: false,

  localHost: 'http://localhost:4100',
  port: 5100,
  hostName: '0.0.0.0', //'127.0.0.1',
  cors: {
    allowedHeaders: ['Accept', 'Accept-Language', 'Content-Language', 'Content-Type', 'Authorization', 'name', 'x-compress'],
    origin: /localhost:.*/,
    credentials: true
  },
  root: 'dist/apps/web',
};
