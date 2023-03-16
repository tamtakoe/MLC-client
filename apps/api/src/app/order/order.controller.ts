import {Body, Controller, Delete, Get, Post} from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { HttpService } from '@nestjs/axios';
import { config } from "../../environments/environment";

@Controller('api')
export class OrderController {
  constructor(private readonly httpService: HttpService) {}

  @Post('orders')
  createOrder(@Body() body: any) {
    const axiosRequestConfig: AxiosRequestConfig = {
      url: `${config.routes.server}/api/v1/order/new`,
      method: 'POST',
      responseType: 'json',
      data: body ?? { orderType: 'AT_PLACE', paymentType: 'AT_PLACE' }
    }

    // @ts-ignore
    return this.httpService.request(axiosRequestConfig).toPromise()
  }

  @Post('orders/product')
  addProduct(@Body() body) {
    const axiosRequestConfig: AxiosRequestConfig = {
      url: `${config.routes.server}/api/v1/order/add`,
      method: 'POST',
      responseType: 'json',
      data: { productId: body.id, count: body.quantity }
    }

    // @ts-ignore
    return this.httpService.request(axiosRequestConfig).toPromise()
  }

  @Delete('orders/product')
  deleteProduct(@Body() body) {
    const axiosRequestConfig: AxiosRequestConfig = {
      url: `${config.routes.server}/api/v1/order/delete`,
      method: 'PUT',
      responseType: 'json',
      data: { productId: body.id, count: body.quantity }
    }

    // @ts-ignore
    return this.httpService.request(axiosRequestConfig).toPromise()
  }




//   curl -X 'PUT' \
//   'http://188.225.14.40:8067/api/v1/order/product/delete' \
// -H 'accept: */*' \
// -H 'Token: 23eigjREtyj1bDAfNwaR0iVYjXHPWxgs74Scq1HELmJLCjdLal/8ZbEUsWLXc1KQcP0/JazLUQabLV5v+a5yWBLeNtT0qou3o3zuDRxblPO4gaxYHTz/HCK3pEHeXPkSGrfFiIcom1XkY0lQAO/tUA==' \
// -H 'Content-Type: application/json' \
// -d '{
//   "productId": 25,
//   "count": 1
// }'

}
