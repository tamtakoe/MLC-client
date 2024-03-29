import { Injectable } from '@angular/core';
import {OrderResource} from "../_resources/order.resource";
import {Router} from "@angular/router";
import {FlashMessage} from "../_services/flash-message";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  mlc: any
  cart = new Map()
  order: any

  constructor(private orderResource: OrderResource, private router: Router, private flashMessage: FlashMessage) {
    this.cart = this.orderResource.loadFromLocalStorage() || new Map()
  }

  setMlc(mlc: any) {
      this.mlc = mlc;
  }

  getCart() {
    return Array.from(this.cart, ([name, value]) => value)
  }

  getTotalPrice() {
    return this.getCart().reduce((prev, next) => {
      return prev += next.price * next.amount
    }, 0)
  }

  createOrder() {
    return this.orderResource.createOrder({})
        .then((order: any) => {
          this.order = order;
        })
        .catch((error: any) => {
          this.flashMessage.error('Error while order creation', { description: JSON.stringify(error) })
        })
  }

  sendOrder() {
      const promises = [];

      for (const [productId, product] of this.cart) {
          const promise = this.addProduct(product)
          promises.push(promise);
      }

      return Promise.all(promises)
          .then(data => {
              return this.orderResource.completeOrder().then(() => {
                  this.orderResource.removeFromLocalStorage()
                  this.router.navigate(['order'], {queryParams: {mlcId: this.mlc.id}} );
              })
          })
  }

  addProduct(product: any) {
    this.cart.set(product.id, product)
    this.orderResource.saveToLocalStorage(this.cart)
    if (this.order) {
      console.log(product);
      return this.orderResource.addProduct({id: product.id, quantity: product.amount})
    }
  }

  deleteProduct(product: any) {
    if (!product.amount) {
      this.cart.delete(product.id)
      this.orderResource.saveToLocalStorage(this.cart)
    }
    if (this.order) {
      return this.orderResource.deleteProduct({id: product.id, quantity: product.amount})
    }
  }
}
