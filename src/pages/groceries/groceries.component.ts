import { Component } from '@angular/core';
import { FetchProductsService } from '../../service/shared-service.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LazyLoadDirective } from '../../directives/lazy-load.directive';

@Component({
  selector: 'app-groceries',
  imports: [CommonModule, RouterLink, LazyLoadDirective],
  templateUrl: './groceries.component.html',
  styleUrl: './groceries.component.css',
})
export class GroceriesComponent {
  groceriesProducts: any[] = [];
  loading = true;
  constructor(private sharedService: FetchProductsService) {}
  ngOnInit(): void {
    this.sharedService.fetchProducts('groceries');
    this.sharedService.productsArray$.subscribe((products) => {
      this.groceriesProducts = products;
    });
  }
  onImageLoad() {
    this.loading = false;
  }
}
