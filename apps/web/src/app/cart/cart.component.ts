import { Component, OnInit } from '@angular/core';
import {CartService} from "./cart.service";
import {Router} from "@angular/router";
import {MainButton} from "../_services/main-button";
import {BackButton} from "../_services/back-button";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(public cartService: CartService,
              private router: Router,
              private mainButton: MainButton,
              private backButton: BackButton) {

    this.mainButton
        .onClick(() => {
          this.cartService.createOrder()
        })
        .setType('success')
        .setText(`Pay ${this.cartService.getTotalPrice()} ₽`)
        .show()

    this.backButton
        .onClick(() => {
          this.router.navigate(['menu'] );
        })
        .show()
  }

  ngOnInit(): void {

  }

  saveOrder() {
    this.mainButton.showProgress()
    this.cartService.createOrder()
      .finally(() => {
        this.mainButton.hideProgress()
      })
  }

}
