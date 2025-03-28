import { Component, OnInit } from '@angular/core';
import { Product } from '../../interface/product';
import { CartService } from '../../service/cart.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, MatIconModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cart: Product[] = [];
  totalPrice: number = 0;
  quantity: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      this.cart = cart;
      this.totalPrice = this.cartService.getCartTotalPrice();
    });
  }
  handleProductRemove(id: string) {
    this.cartService.removeFromCart(id);
  }
  handleCartClear() {
    this.cartService.clearCart();
  }
  hanleCartQuantityUpdate(id: string) {
    this.cartService.updateQuantity(id);
  }
}
