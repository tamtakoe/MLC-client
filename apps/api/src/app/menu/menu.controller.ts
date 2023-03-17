import { Controller, Get } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { HttpService } from '@nestjs/axios';
import { MenuService } from './menu.service';
import { config } from "../../environments/environment";

@Controller('api')
export class MenuController {
  constructor(private readonly httpService: HttpService, private readonly menuService: MenuService) {}

  @Get('menu')
  getMenu() {
    // return this.menuService.getMenu();

    const axiosRequestConfig: AxiosRequestConfig = {
      url: `${config.routes.server}/api/v1/mlc/info/1`,
      method: 'GET',
      responseType: 'json',
    }

    // @ts-ignore
    return this.httpService.request(axiosRequestConfig).toPromise()
        .then(data => data.data)
        .then(data => { // Replace image links from absolute to relative /static
          data.menus.forEach(menu => {
            menu.groups.forEach(group => {
              group.products.forEach(product => {
                product.photoLinks = product.photoLinks.replace(/.*\/api\/v1\/image/, '/static')
              })
            })
          })

          return data;
        })
        .catch(error => {
      // console.log(error);
      // console.log(error.response.data);

      return error.response.data.error;

      // return Promise.reject(error);
    });
  }
}
