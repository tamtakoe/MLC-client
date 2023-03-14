import { NestFactory } from '@nestjs/core';
import { Request, urlencoded, json } from 'express';
import cookieParser from 'cookie-parser';
import { AppModule } from './app/app.module';
import { config, webConfig } from './environments/environment';

async function bootstrap() {
  console.log('CONFIG', config);
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });

  app.use(cookieParser());
  app.use(json({ limit: '1mb' }));
  app.use(urlencoded({ extended: true, limit: '1mb' }));

  /**
   * Use local cors
   */
  if (!config.production) {
    app.enableCors(config.cors);
  }

  await app.listen(config.port, config.hostName, () => {
    console.log(`Listening at ${config.hostName}:${config.port}...`);
  });

  /**
   * Serve static. See app.module.ts
   */
}

bootstrap();
