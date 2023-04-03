// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { DndModule } from 'ngx-drag-drop';
import { AppRoutingModule } from "./app-routing.module";

// Components
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { MenuComponent } from './menu/menu.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { PreloaderComponent } from "./_components/preloader/preloader.component";
import { AdminMenuComponent } from './admin-menu/admin-menu.component';

// Services
import { FlashMessage } from "./_services/flash-message";
import { MainButton } from "./_services/main-button";
import { BackButton } from "./_services/back-button";

// Resources
import { MenuResource } from "./_resources/menu.resource";
import { OrderResource } from "./_resources/order.resource";
import { UsersResource } from "./_resources/users.resource";

@NgModule({
  declarations: [AppComponent, ErrorPageComponent, PreloaderComponent, MenuComponent, CartComponent, OrderComponent, AdminMenuComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule, DndModule],
  providers: [FlashMessage, MainButton, BackButton, MenuResource, OrderResource, UsersResource],
  bootstrap: [AppComponent],
})
export class AppModule {}
