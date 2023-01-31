import { ReactiveResource, StateConfig } from 'oi-angular-resource/core';
import { HttpConfig, HttpMethod, Get, Post, Put, Patch, Delete, Options, Head, Jsonp} from 'oi-angular-resource/http';
import { WebSocketConfig, Open, Close, Send } from 'oi-angular-resource/websocket';
import { LocalStorageConfig, LoadFromLocalStorage, SaveToLocalStorage, RemoveFromLocalStorage } from 'oi-angular-resource/local-storage';
import { config } from '../../environments/environment';

const resources: any = config.resources;
let defaultHeaders = {};

resources.api.headers = Object.assign(defaultHeaders, resources.api.headers);

// @Injectable() //Don't use because of core.js:3866 ERROR RangeError: Maximum call stack size exceeded
// at ApiResource_Factory (api-resource.ts:87)
@HttpConfig({
  host: resources.api.host,
  headers: resources.api.headers,
  params: resources.api.params,
  withCredentials: config.resources.api.withCredentials,
  transformResponse(response, options) {
    let newResponse = response;

    if (response && options.isArray) {
      newResponse = Array.isArray(response.data) ? response.data : [];

      for (const key in response) {
        // eslint-disable-next-line no-prototype-builtins
        if (key !== 'data' && response.hasOwnProperty(key)) {
          newResponse[key] = response[key];
        }
      }
    }

    return newResponse;
  }
})
export class ApiResource extends ReactiveResource {
  // TODO: add explicit constructor

  // Http methods
  // query: HttpMethod<{limit?: number}, [{id, type}]>   = Get({isArray: true});
  query   = Get({isArray: true});
  get     = Get();
  create  = Post();
  update  = Patch();
  replace = Put();
  delete  = Delete();

  // Web socket methods
  open    = Open();
  close   = Close();
  send    = Send();

  // Local storage
  loadFromLocalStorage = LoadFromLocalStorage();
  saveToLocalStorage = SaveToLocalStorage();
  removeFromLocalStorage = RemoveFromLocalStorage();
}

export * from 'oi-angular-resource/core';
export * from 'oi-angular-resource/http';
export * from 'oi-angular-resource/websocket';
