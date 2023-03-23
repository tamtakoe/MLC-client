import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule} from "@angular/forms";
import {MenuResource} from "./_resources/menu.resource";
import { CartComponent } from './cart/cart.component';
import {OrderResource} from "./_resources/order.resource";
import { OrderComponent } from './order/order.component';
import {FlashMessage} from "./_services/flash-message";
import {MainButton} from "./_services/main-button";
import {BackButton} from "./_services/back-button";
import {PreloaderComponent} from "./_components/preloader/preloader.component";
import { AdminMenuComponent } from './admin-menu/admin-menu.component';

@NgModule({
  declarations: [AppComponent, ErrorPageComponent, PreloaderComponent, MenuComponent, CartComponent, OrderComponent, AdminMenuComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule],
  providers: [FlashMessage, MainButton, BackButton, MenuResource, OrderResource],
  bootstrap: [AppComponent],
})
export class AppModule {}
