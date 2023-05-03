import {Module, Injectable, MiddlewareConsumer, NestMiddleware, NestModule} from "@nestjs/common";
import {HttpModule, HttpService} from "@nestjs/axios";
import { Request, Response, NextFunction } from 'express';
import { AxiosResponse } from 'axios';
import {Observable} from "rxjs";
import {config} from "../environments/environment";

@Module({
    imports: [HttpModule]
})
export class AssetsMiddlewareModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AssetsMiddleware).forRoutes('*');
    }
}

@Injectable()
export class AssetsMiddleware implements NestMiddleware {
    constructor(private readonly httpService: HttpService) {}

    use(req: Request, res: Response, next: NextFunction): Observable<AxiosResponse> | void {
        const proxyPath = '/static';
        const targetUrl = req.originalUrl.replace(/.*?static/, `${config.routes.server}/api/v1/image`);
        const proxyReq = this.httpService.request({
            method: 'GET',
            url: targetUrl,
            responseType: 'arraybuffer'
        });

        if (req.originalUrl.startsWith(proxyPath)) {
            proxyReq.subscribe({
                next: (response: AxiosResponse) => {
                    const headers = {'Content-Type': 'image/jpeg'};
                    res.writeHead(200, headers);
                    res.end(response.data, 'binary');
                },
                error: (error: any) => {
                    res.status(error?.response?.status).send(error?.response?.statusText);
                },
            });
        } else {
            next()
        }
    }
}
