import { Injectable } from '@angular/core';
import { ApiResource, HttpConfig, Get, Post, Put, Patch, Delete } from './api-resource';
import {
  LocalStorageConfig
} from "oi-angular-resource/local-storage";

@Injectable()
@HttpConfig({
  url: '/orders',
})
@LocalStorageConfig({
  name: 'order',
  transformRequest: orderMap => JSON.stringify(Array.from(orderMap, ([name, value]) => value)),
  transformResponse: orderArr => new Map(JSON.parse(orderArr).map((obj: any) => [obj.id, obj]))
})
export class OrderResource extends ApiResource {
  createOrder = Post();

  addProduct = Post({
      url: '/orders/product'
  })

  deleteProduct = Post({
    url: '/orders/product'
  })
}
