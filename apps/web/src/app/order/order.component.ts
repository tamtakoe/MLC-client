import { Component, OnInit } from '@angular/core';
import {BackButton} from "../_services/back-button";
import {Router} from "@angular/router";
import {MainButton} from "../_services/main-button";
import {OrderResource} from "../_resources/order.resource";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  webApp = ''
  info = ''
  order: any

  constructor(private router: Router,
              private orderResource: OrderResource,
              private mainButton: MainButton,
              private backButton: BackButton) {
    // this.backButton.onClick(() => {
    //   this.router.navigate(['menu'] );
    // })
    this.backButton.hide()
    this.mainButton.hide();

    this.orderResource.getCurrentOrder()
      .then((order: any) => {
        this.order = order;
      })
  }

// {
//   id: 64
//   orderStatus: "FRESH"
//   orderType: "AT_PLACE"
//   paymentType: "AT_PLACE"
//   products: [
//     {productId: 27, count: 1, countStr: "шт", name: "Американо", price: 120, total: 120, loyaltyOn: true, sale: 0}
//   ]
// }

  ngOnInit(): void {
    this.webApp = JSON.stringify(window.Telegram.WebApp, null, 2)
    this.info = document.referrer
  }

}
