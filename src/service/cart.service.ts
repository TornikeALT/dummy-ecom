import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interface/product';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>(this.cart);

  cart$ = this.cartSubject.asObservable();

  constructor(private authService: AuthService) {}

  addToCart(item: Product) {
    if (!this.authService.isLoggedIn()) {
      alert(' you must log in to add items to cart');
      return;
    }
    const existingItem = this.cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cart.push({ ...item, quantity: item.quantity || 1 }); // set quantity to new item
    }
    this.cartSubject.next([...this.cart]);
  }

  updateQuantity(itemId: string) {
    const item = this.cart.find((cartItem) => cartItem.id === itemId);
    if (item) {
      item.quantity += 1;
    }
    this.cartSubject.next([...this.cart]);
  }
  removeFromCart(itemId: string) {
    this.cart = this.cart.filter((item) => item.id !== itemId);
    this.cartSubject.next([...this.cart]);
  }

  getTotalCartQty(): number {
    let sum = 0;
    this.cart.map((curr) => {
      sum += curr.quantity;
    });
    return sum;
  }

  getCartTotalPrice(): number {
    return this.cart.reduce(
      (total, item) => (total += item.price * item.quantity),
      0
    );
  }

  clearCart() {
    this.cart = [];
    this.cartSubject.next([]);
  }
}
