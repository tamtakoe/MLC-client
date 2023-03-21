import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  webApp: any

  constructor() { }

  ngOnInit(): void {
    // @ts-ignore
    this.webApp = JSON.stringify(window.Telegram.WebApp, null, 2)
  }

}
