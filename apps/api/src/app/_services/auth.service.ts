import {Body, Injectable, Post} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import { firstValueFrom } from 'rxjs';
import {AxiosRequestConfig} from "axios/index";
import {config} from "../../environments/environment";

@Injectable()
export class AuthService {

  constructor(private readonly httpService: HttpService) {
  }

  getUserToken(telegramUserId) {
    console.log('$GET_USER_TOKEN', `${config.routes.server}/api/v1/admin/1/token?tgId=${telegramUserId}`);
    const axiosRequestConfig: AxiosRequestConfig = {
      url: `${config.routes.server}/api/v1/admin/1/token?tgId=${telegramUserId}`,
      method: 'GET',
      responseType: 'json'
    }

    return firstValueFrom(this.httpService.request(axiosRequestConfig))
        .then(data => data.data)
  }
}
