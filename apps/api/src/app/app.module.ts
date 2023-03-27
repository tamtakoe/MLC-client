import {join} from 'path';
import {Module, MiddlewareConsumer, NestModule} from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { MenuController } from './menu/menu.controller';
import { MenuService } from './menu/menu.service';
import {AssetsMiddlewareModule} from "./assets-middleware.module";
import {OrderController} from "./order/order.controller";
import {BackendService} from "./_services/backend.service";
import {UsersController} from "./users/users.controller";
import {AuthService} from "./_services/auth.service";

@Module({
  imports: [
    AssetsMiddlewareModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../web'),
      exclude: ['/static(.*)']
    }),
    HttpModule,
  ],
  controllers: [AppController, MenuController, OrderController, UsersController],
  providers: [MenuService, BackendService, AuthService],
})
export class AppModule {}
