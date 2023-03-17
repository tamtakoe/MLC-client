import {Body, Injectable, Post} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {AxiosRequestConfig} from "axios/index";
import {config} from "../../environments/environment";

@Injectable()
export class BackendService {

  token: string

  constructor(private readonly httpService: HttpService) {
  }

  getUserToken(telegramUserId, phoneNumber) {
    console.log('$GET_USER_TOKEN', telegramUserId, phoneNumber);
    const axiosRequestConfig: AxiosRequestConfig = {
      url: `${config.routes.server}/api/v1/admin/1/token?tgId=${telegramUserId}&phone=${phoneNumber}`,
      method: 'GET',
      responseType: 'json'
    }

    console.log(axiosRequestConfig);

    // @ts-ignore
    return this.httpService.request(axiosRequestConfig).toPromise().then(data => data.data)
  }

  request(axiosRequestConfig: AxiosRequestConfig) {
    axiosRequestConfig.headers = axiosRequestConfig.headers || {}
    axiosRequestConfig.headers['Token'] = this.token

    console.log('$REQUEST', axiosRequestConfig);

    // @ts-ignore
    return this.httpService.request(axiosRequestConfig).toPromise()
        .catch(error => {
          console.log(`Error ${error?.response?.status} ${error?.response?.statusText}`);
          // if (error?.response?.status === 403) {
            return this.getUserToken( 761307220, 79245723134).then((data: any) => {
              this.token = data.token;
              axiosRequestConfig.headers['Token'] = this.token
              
              console.log('$TOKEN', this.token);

              // @ts-ignore
              return this.httpService.request(axiosRequestConfig).toPromise()
            })
          // }
          // throw error
        })
        .then(data => {
          console.log('$RESPONSE', data.data);
          return data.data
        })
  }
}
