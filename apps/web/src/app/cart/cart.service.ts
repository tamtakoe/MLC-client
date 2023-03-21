import { Injectable } from '@angular/core';
import {OrderResource} from "../_resources/order.resource";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new Map()
  order: any

  constructor(private orderResource: OrderResource, private router: Router) {
    this.cart = this.orderResource.loadFromLocalStorage() || new Map()
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
    this.orderResource.createOrder({}).then((order: any) => {
      const promises = [];
      this.order = order;

      for (const [productId, product] of this.cart) {
        const promise = this.addProduct(product)
        promises.push(promise);
      }

      return Promise.all(promises).then(data => {
        return this.orderResource.completeOrder().then(() => {
          this.orderResource.removeFromLocalStorage()
          this.router.navigate(['order'] );
        })
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
