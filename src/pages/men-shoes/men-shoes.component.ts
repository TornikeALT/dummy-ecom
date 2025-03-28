import { Component, OnInit } from '@angular/core';
import { FetchProductsService } from '../../service/shared-service.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LazyLoadDirective } from '../../directives/lazy-load.directive';

@Component({
  selector: 'app-men-shoes',
  imports: [CommonModule, RouterLink, LazyLoadDirective],
  templateUrl: './men-shoes.component.html',
  styleUrl: './men-shoes.component.css',
})
export class MenShoesComponent implements OnInit {
  menShoes: any[] = [];
  constructor(private fetchProducts: FetchProductsService) {}
  ngOnInit(): void {
    this.fetchProducts.fetchProducts('mens-shoes');
    this.fetchProducts.productsArray$.subscribe((products) => {
      this.menShoes = products;
    });
  }
}
