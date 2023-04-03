import { NestFactory } from '@nestjs/core';
import { Request, urlencoded, json } from 'express';
import cookieParser from 'cookie-parser';
import { AppModule } from './app/app.module';
import { config, webConfig } from './environments/environment';
import {AuthService} from "./app/_services/auth.service";

async function bootstrap() {

  console.log('CONFIG', config);
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });

  app.use(cookieParser());
  app.use(json({ limit: '1mb' }));
  app.use(urlencoded({ extended: true, limit: '1mb' }));

  if (!config.production) {
    /**
     * Use local cors
     */
    app.enableCors(config.cors);

    /**
     * Ask credentials for local development
     */
    try {
      const appContext = await NestFactory.createApplicationContext(AppModule);
      const authService = await appContext.get(AuthService);
      const auth = await authService.getUserToken(761307220, 1);
      await appContext.close();

      /**
       * Add auth cookie to each request for local environment
       */
      app.use((req: Request, res: Response, next: any) => {
        if (auth?.token) {
          (req.headers as any)['cookie'] = `authToken=${auth.token};`;
          req.cookies['authToken'] = auth.token
        }
        next();
      });

    } catch (e) {
      console.error(e);
    }
  }

  await app.listen(config.port, config.hostName, () => {
    console.log(`Listening at ${config.hostName}:${config.port}...`);
  });

  /**
   * Serve static. See app.module.ts
   */
}

bootstrap();
