import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FetchProductsService } from '../../service/shared-service.service';
import { RouterLink } from '@angular/router';
import { LazyLoadDirective } from '../../directives/lazy-load.directive';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, LazyLoadDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  products: any[] = [];

  constructor(private sharedService: FetchProductsService) {}

  ngOnInit(): void {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        this.products = data.products;
      });
  }
}
