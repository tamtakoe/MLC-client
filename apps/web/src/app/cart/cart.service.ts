import { Injectable } from '@angular/core';
import {OrderResource} from "../_resources/order.resource";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new Map()

  constructor(private orderResource: OrderResource) {
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
    this.orderResource.createOrder().then((data: any) => {

    })
  }

  addProduct(product: any) {
    this.cart.set(product.id, product)
    this.orderResource.saveToLocalStorage(this.cart)
  }

  deleteProduct(product: any) {
    if (!product.amount) {
      this.cart.delete(product.id)
      this.orderResource.saveToLocalStorage(this.cart)
    }
  }
}
