import { Component, OnInit } from '@angular/core';
import {CartService} from "./cart.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(public cartService: CartService, private router: Router) {

    window.Telegram.WebApp.MainButton.color = "rgb(49, 181, 69)"
    window.Telegram.WebApp.onEvent('mainButtonClicked', () => {
      this.cartService.createOrder()
    })

    window.Telegram.WebApp.MainButton.text = `Pay ${this.cartService.getTotalPrice()} ₽`
    // this.totalPrice
    //     ? window.Telegram.WebApp.MainButton.show()
    //     : window.Telegram.WebApp.MainButton.hide()
    window.Telegram.WebApp.onEvent('backButtonClicked', () => {
      this.router.navigate(['main'] );
    })
    window.Telegram.WebApp.BackButton.show()
  }

  ngOnInit(): void {

  }

  saveOrder() {
    this.cartService.createOrder()
  }

}
