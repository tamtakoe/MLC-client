import { Injectable } from '@angular/core';
import { ApiResource, HttpConfig, Get, Post, Put, Patch, Delete } from './api-resource';

@Injectable()
@HttpConfig({
  url: '/users/:id',
})
export class UsersResource extends ApiResource {

  getToken = Get({
    url: '/users/current/token?telegramId=:telegramId'
  })

  authorize = Post({
    url: '/users/current/authorize'
  })
}
