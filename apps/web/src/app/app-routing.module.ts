import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import {AppComponent} from "./app.component";
import {MenuComponent} from "./menu/menu.component";
const MAIN_ROUTES: Routes = [
  { path: '',   component: MenuComponent},
  { path: 'test',   component: AppComponent},
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
