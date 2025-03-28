import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FetchProductsService } from '../../service/shared-service.service';
import { RouterLink } from '@angular/router';
import { LazyLoadDirective } from '../../directives/lazy-load.directive';

@Component({
  selector: 'app-laptops',
  imports: [CommonModule, RouterLink, LazyLoadDirective],
  templateUrl: './laptops.component.html',
  styleUrl: './laptops.component.css',
})
export class LaptopsComponent implements OnInit {
  laptops: any[] = [];
  constructor(private sharedService: FetchProductsService) {}
  ngOnInit(): void {
    this.sharedService.fetchProducts('laptops');
    this.sharedService.productsArray$.subscribe((products) => {
      this.laptops = products;
    });
  }
}
