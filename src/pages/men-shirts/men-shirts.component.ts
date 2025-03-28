import { Component, OnInit } from '@angular/core';
import { FetchProductsService } from '../../service/shared-service.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LazyLoadDirective } from '../../directives/lazy-load.directive';

@Component({
  selector: 'app-men-shirts',
  imports: [CommonModule, RouterLink, LazyLoadDirective],
  templateUrl: './men-shirts.component.html',
  styleUrl: './men-shirts.component.css',
})
export class MenShirtsComponent implements OnInit {
  menShirts: any[] = [];
  constructor(private fetchProducts: FetchProductsService) {}
  ngOnInit(): void {
    this.fetchProducts.fetchProducts('mens-shirts');
    this.fetchProducts.productsArray$.subscribe((products) => {
      this.menShirts = products;
    });
  }
}
