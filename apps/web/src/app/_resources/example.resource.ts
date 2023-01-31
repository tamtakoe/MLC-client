import { Injectable } from '@angular/core';
import { ApiResource, HttpConfig, Get, Post, Put, Patch, Delete } from './api-resource';
import { getItems } from './example.mock';
import {Close, Open, Send, WebSocketConfig} from "oi-angular-resource/websocket";
import {
  CloseSocketIo,
  OpenSocketIo,
  SendSocketIo,
  SendSocketIoEvent,
  SocketIoConfig
} from "oi-angular-resource/socket-io";
import {
  LoadFromLocalStorage,
  LocalStorageConfig,
  RemoveFromLocalStorage,
  SaveToLocalStorage
} from "oi-angular-resource/local-storage";
import {config} from "../../environments/environment";

@Injectable()
@HttpConfig({
  url: '/',
})
@WebSocketConfig({
  url: 'ws://0.0.0.0:9000',
  protocols: []
})
@SocketIoConfig({
  url: '//0.0.0.0:5100', // socket server url;
  options: {
    path: '/ws',
    transports: ['websocket']
  }
} /* as SocketIoConfig */)
@LocalStorageConfig({
  name: 'ls'
})
export class ExampleResource extends ApiResource {
  // Http methods
  // query: HttpMethod<{limit?: number}, [{id, type}]>   = Get({isArray: true});
  override query = Get({
    mock: getItems,
    isArray: true
  });
  override get     = Get();
  override create  = Post();
  override update  = Patch();
  override replace = Put();
  override delete  = Delete();

  getGreetings = Get({url: '/examples/greetings', responseType: 'text'});

  // Web socket methods
  override open    = Open();
  override close   = Close();
  override send    = Send();

  // Socket.IO methods
  openSocketIo    = OpenSocketIo();
  closeSocketIo   = CloseSocketIo();
  sendSocketIo    = SendSocketIo();
  sendSocketIoEvent = SendSocketIoEvent('someEvent');

  // Local storage
  override loadFromLocalStorage = LoadFromLocalStorage();
  override saveToLocalStorage = SaveToLocalStorage();
  override removeFromLocalStorage = RemoveFromLocalStorage();
}
