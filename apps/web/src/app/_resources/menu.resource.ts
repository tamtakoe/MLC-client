import { Injectable } from '@angular/core';
import { ApiResource, HttpConfig, Get, Post, Put, Patch, Delete } from './api-resource';

@Injectable()
@HttpConfig({
  url: '/',
})
export class MenuResource extends ApiResource {
  getMenu = Get({
    url: '/menu'
  });
}
