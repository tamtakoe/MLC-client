import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import {AppComponent} from "./app.component";
import {MenuComponent} from "./menu/menu.component";
import {CartComponent} from "./cart/cart.component";
import {OrderComponent} from "./order/order.component";
import {AdminMenuComponent} from "./admin-menu/admin-menu.component";
import {authResolver} from "./_services/auth.resolver";
const MAIN_ROUTES: Routes = [
  { path: '',   component: MenuComponent },
  { path: 'menu',   component: MenuComponent },
  { path: 'cart',   component: CartComponent },
  { path: 'order',   component: OrderComponent },
  { path: 'admin-menu',   component: AdminMenuComponent },
  { path: 'test',   component: AppComponent },
  { path: '**', component: ErrorPageComponent }
];

const routes: Routes = MAIN_ROUTES;

@NgModule({
  // imports: [RouterModule.forRoot(routes, {useHash: true})],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor(private router: Router) {

  }
}
