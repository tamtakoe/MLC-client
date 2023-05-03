import { Body, HttpException, Injectable, Post } from "@nestjs/common";
import {HttpService} from "@nestjs/axios";
import { firstValueFrom } from 'rxjs';
import {AxiosRequestConfig} from "axios/index";
import { Request, Response } from 'express';

@Injectable()
export class BackendService {

  constructor(private readonly httpService: HttpService) {
  }

  request(axiosRequestConfig: AxiosRequestConfig, authorizationReq?: Request) {
    if (authorizationReq) {
      axiosRequestConfig.headers = axiosRequestConfig.headers || {}
      axiosRequestConfig.headers['Authorization'] = authorizationReq.cookies.authToken//.headers.['cookie']
    }

    console.log('$REQUEST', axiosRequestConfig);

    return firstValueFrom(this.httpService.request(axiosRequestConfig))
        .then(data => {
          console.log('$RESPONSE SUCCESS', data.data);
          return data.data
        })
        .catch(error => {
            console.log(`$RESPONSE ERROR ${error?.message}`, error);
          throw new HttpException(error?.response?.data?.message, error?.response?.status);
        })

  }
}
