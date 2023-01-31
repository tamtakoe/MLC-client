import { Controller, Get } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { HttpService } from '@nestjs/axios';
import { AppService } from './app.service';

const httpService = new HttpService();

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('menu')
  getMenu() {
    // return this.appService.getMenu();

    const axiosConfig: AxiosRequestConfig = {
      url: 'http://188.225.14.40:8067/api/v1/mlc/1/',
      method: 'GET',
      responseType: 'json',
      headers: {
        UserId: 1
      },
    }

    // @ts-ignore
    return httpService.request(axiosConfig).toPromise().then((data: any) => {
      return data;

    }).catch(error => {
      console.log(error);

      return Promise.reject(error);
    });
  }
}
