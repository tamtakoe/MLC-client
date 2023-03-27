import { Injectable } from '@angular/core';
import {UsersResource} from '../_resources/users.resource';

@Injectable({
  providedIn: 'root'
})
export class CurrentUser {
  // [key: string]: any;
  //
  // private tokenPromise: any;
  // private auth: any;
  //
  // constructor(private userResource: UsersResource) {
  //   this.loadUser();
  // }
  //
  // get() {
  //   return this
  // }
  //
  // getToken() {
  //
  // }
  //
  // loadUser() {
  //   Object.assign(this, window?.Telegram?.WebApp?.initDataUnsafe?.user);
  // }
  //
  // loadToken() {
  //   this.tokenPromise = this.userResource.getToken().then((auth: any) => {
  //     if (auth) {
  //       this.auth = auth;
  //     }
  //     return auth;
  //   });
  //
  //   return this.tokenPromise;
  // }
}
