import { Controller, Get } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { HttpService } from '@nestjs/axios';
import { AppService } from './app.service';
import { config } from "../environments/environment";

const httpService = new HttpService();

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('menu')
  getMenu() {
    // return this.appService.getMenu();

    const axiosConfig: AxiosRequestConfig = {
      url: `${config.routes.server}/api/v1/mlc/info/1`,
      method: 'GET',
      responseType: 'json',
      // headers: {
      //   UserId: 1
      // },
    }

    // @ts-ignore
    return httpService.request(axiosConfig).toPromise().then((data: any) => {
      // console.log(data)
      return data.data;

    }).catch(error => {
      // console.log(error);
      // console.log(error.response.data);

      return error.response.data.error;

      // return Promise.reject(error);
    });
  }
}
