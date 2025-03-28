import { Component, OnInit } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { NavigationComponent } from '../components/navigation/navigation.component';
import { FooterComponent } from '../components/footer/footer.component';
import { CartService } from '../service/cart.service';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../interceptor/auth.interceptor';
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavigationComponent,
    RouterLink,
    FooterComponent,
    MatIconModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class AppComponent implements OnInit {
  title = 'e-commerce';
  cartTotalItems: number = 0;
  isLoginRoute = false;
  user: any = null;

  constructor(
    private cart: CartService,
    private router: Router,
    private authService: AuthService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginRoute = event.url === '/login';
      }
    });
  }

  ngOnInit(): void {
    this.cart.cart$.subscribe(() => {
      this.cartTotalItems = this.cart.getTotalCartQty();
    });
    this.authService.user$.subscribe((userData) => {
      this.user = userData;
    });
    this.user = this.authService.getUser();
  }
  handleLogout() {
    this.authService.logout();
    this.cart.clearCart();
  }
}
