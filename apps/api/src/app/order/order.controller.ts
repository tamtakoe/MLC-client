import {Body, Controller, Delete, Get, Param, Post, Put, Req} from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { Request, Response } from 'express';
import { config } from "../../environments/environment";
import {BackendService} from "../_services/backend.service";

@Controller('api')
export class OrderController {
  constructor(private readonly backendService: BackendService) {}

  @Post('orders')
  createOrder(@Body() body: any, @Req() req: Request) {
    console.log('Create order');
    const axiosRequestConfig: AxiosRequestConfig = {
      url: `${config.routes.server}/api/v1/order/new`,
      method: 'POST',
      responseType: 'json',
      data: body ?? { orderType: 'AT_PLACE', paymentType: 'AT_PLACE' }
    }

    return this.backendService.request(axiosRequestConfig, req)
  }

  @Put('orders/:id/submit')
  submitOrder(@Param('id') id: string, @Req() req: Request) {
    console.log(`Submit order ${id}`);
    const axiosRequestConfig: AxiosRequestConfig = {
      url: `${config.routes.server}/api/v1/order/${id}/submit`,
      method: 'PUT',
      responseType: 'json'
    }

    return this.backendService.request(axiosRequestConfig, req)
  }

  @Put('orders/:id/status/:type')
  changeOrderStatus(@Param('id') id: string, @Param('type') type: string, @Req() req: Request) {
    // FRESH, CART, WAITING_PAYMENT, PAYED, IN_PROGRESS, READY, DONE, PROBLEM, CANCELED
    const axiosRequestConfig: AxiosRequestConfig = {
      url: `${config.routes.server}/api/v1/order/${id}/type/${type}`,
      method: 'PUT',
      responseType: 'json'
    }

    return this.backendService.request(axiosRequestConfig, req)
  }

  @Put('orders/complete')
  completeOrder(@Body() body, @Req() req: Request) {
    const axiosRequestConfig: AxiosRequestConfig = {
      url: `${config.routes.server}/api/v1/order/complete/AT_PLACE/AT_PLACE`,
      method: 'PUT',
      responseType: 'json'
    }

    return this.backendService.request(axiosRequestConfig, req)
  }

  @Post('orders/product')
  addProduct(@Body() body, @Req() req: Request) {
    const axiosRequestConfig: AxiosRequestConfig = {
      url: `${config.routes.server}/api/v1/order/add`,
      method: 'PUT',
      responseType: 'json',
      data: { productId: body.id, count: body.quantity }
    }

    return this.backendService.request(axiosRequestConfig, req)
  }

  @Delete('orders/product')
  deleteProduct(@Body() body, @Req() req: Request) {
    const axiosRequestConfig: AxiosRequestConfig = {
      url: `${config.routes.server}/api/v1/order/delete`,
      method: 'PUT',
      responseType: 'json',
      data: { productId: body.id, count: body.quantity }
    }

    return this.backendService.request(axiosRequestConfig, req)
  }
}
