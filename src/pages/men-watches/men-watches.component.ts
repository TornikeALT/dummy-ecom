import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FetchProductsService } from '../../service/shared-service.service';
import { RouterLink } from '@angular/router';
import { LazyLoadDirective } from '../../directives/lazy-load.directive';

@Component({
  selector: 'app-men-watches',
  imports: [CommonModule, RouterLink, LazyLoadDirective],
  templateUrl: './men-watches.component.html',
  styleUrl: './men-watches.component.css',
})
export class MenWatchesComponent implements OnInit {
  menWatches: any[] = [];
  constructor(private fetchProducts: FetchProductsService) {}

  ngOnInit(): void {
    this.fetchProducts.fetchProducts('mens-watches');
    this.fetchProducts.productsArray$.subscribe((products) => {
      this.menWatches = products;
    });
  }
}
