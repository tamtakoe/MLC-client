import { Component, OnInit } from '@angular/core';
import {BackButton} from "../_services/back-button";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  webApp = ''
  info = ''

  constructor(private router: Router, private backButton: BackButton) {
    this.backButton.onClick(() => {
      this.router.navigate(['cart'] );
    })
    this.backButton.show()
  }

  ngOnInit(): void {
    this.webApp = JSON.stringify(window.Telegram.WebApp, null, 2)
    this.info = document.referrer
  }

}
