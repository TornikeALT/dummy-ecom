import { Component, OnInit } from '@angular/core';
import { FetchProductsService } from '../../service/shared-service.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LazyLoadDirective } from '../../directives/lazy-load.directive';

@Component({
  selector: 'app-furniture',
  imports: [CommonModule, RouterLink, LazyLoadDirective],
  templateUrl: './furniture.component.html',
  styleUrl: './furniture.component.css',
})
export class FurnitureComponent implements OnInit {
  furnitureProducts: any[] = [];
  loading = true;

  constructor(private sharedService: FetchProductsService) {}
  ngOnInit(): void {
    this.sharedService.fetchProducts('furniture');
    this.sharedService.productsArray$.subscribe((products) => {
      this.furnitureProducts = products;
      this.loading = false;
    });
  }
  onImageLoad() {
    this.loading = false;
  }
}
