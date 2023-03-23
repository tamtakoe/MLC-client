import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {MenuResource} from "../_resources/menu.resource";
import {CartService} from "../cart/cart.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if (this.isPageMenuScrollingTimeoutId) {
      return;
    }

    // Detect the most visible group
    const containerElement = this.element.nativeElement.querySelector('.menu-group-wrapper')
    const groupElements = this.element.nativeElement.querySelectorAll('.menu-group')
    const containerElementRect = containerElement.getBoundingClientRect()
    let groupId = 0
    let visibleHeight = 0;

    for (let i = 0; i < groupElements.length; i++) {
      const groupElement = groupElements[i];
      const groupElementRect = groupElement.getBoundingClientRect();
      let visibleTop;
      let visibleBottom;

      if (groupElementRect.top >= containerElementRect.top && groupElementRect.top < containerElementRect.bottom) {
        visibleTop = groupElementRect.top;
      }

      if (groupElementRect.bottom >= containerElementRect.top && groupElementRect.top < containerElementRect.bottom) {
        visibleBottom = groupElementRect.bottom;
      }

      if (visibleTop === undefined && visibleBottom !== undefined) {
        visibleTop = containerElementRect.top;
      }

      if (visibleTop !== undefined && visibleBottom === undefined) {
        visibleBottom = containerElementRect.bottom;
      }

      if (visibleTop !== undefined && visibleBottom !== undefined) {
        const newVisibleHeight = visibleBottom - visibleTop;

        if (newVisibleHeight > visibleHeight + 10) {
          visibleHeight = newVisibleHeight;
          groupId = parseInt(groupElement.id.slice(2));
        }
      }
    }

    if (groupId === this.targetGroupId) {
      this.targetGroupId = null;
    }

    if (!this.targetGroupId) {
      this.scrollToTopMenu(groupId);
    }
  }

  mlc: any;
  menu: any = [];
  groupId = 0;
  targetGroupId: any = null;
  totalPrice = 0;
  isPageMenuScrollingTimeoutId = 0;

  constructor(private element: ElementRef,
              private menuResource: MenuResource,
              private cartService: CartService,
              private router: Router) {

    window.Telegram.WebApp.expand()
    window.Telegram.WebApp.BackButton.hide()
    window.Telegram.WebApp.MainButton.color = "rgb(49, 181, 69)"
    window.Telegram.WebApp.onEvent('mainButtonClicked', () => {
      this.router.navigate(['cart'] );
    })
  }

  ngOnInit(): void {
    this.updateTotal()
    this.menuResource.getMenu().then((data: any) => {
      this.mlc = data.mlc
      this.menu = data.menus[0].groups;
      this.groupId = this.menu[0].id;
    })
  }

  scrollToTopMenu(groupId: number) {
    this.groupId = groupId;
    this.element.nativeElement.querySelector('#a-' + groupId).scrollIntoView({ block: "start", behavior: "auto"})
  }

  scrollToPageMenu(groupId: number) {
    this.isPageMenuScrollingTimeoutId = setTimeout(() => {
      this.isPageMenuScrollingTimeoutId = 0;
    }, 1000)
    this.groupId = this.targetGroupId = groupId;
    this.element.nativeElement.querySelector('#b-' + groupId).scrollIntoView({block: "start", behavior: "smooth"})
  }

  addToCart(item: any) {
    if (isNaN(item.amount)) {
      item.amount = 0;
    }

    item.amount++;
    this.cartService.addProduct(item);
    this.updateTotal();
  }

  removeFromCart(item: any) {
    if (item.amount) {
      item.amount--;
    }
    this.cartService.deleteProduct(item);
    this.updateTotal();
  }

  updateTotal() {
    this.totalPrice = 0;
    this.menu.forEach((group: any) => {
      group.products.forEach((item: any) => {
        this.totalPrice += (item.amount || 0) * item.price;
      })
    })

    window.Telegram.WebApp.MainButton.text = `View order ${this.totalPrice} ₽`
    this.totalPrice
        ? window.Telegram.WebApp.MainButton.show()
        : window.Telegram.WebApp.MainButton.hide()
  }
}
