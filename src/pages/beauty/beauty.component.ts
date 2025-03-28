import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FetchProductsService } from '../../service/shared-service.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LazyLoadDirective } from '../../directives/lazy-load.directive';

@Component({
  selector: 'app-beauty',
  imports: [CommonModule, RouterLink, LazyLoadDirective],
  templateUrl: './beauty.component.html',
  styleUrl: './beauty.component.css',
})
export class BeautyComponent implements OnInit {
  beautyProducts: any[] = [];
  constructor(
    private sharedService: FetchProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.sharedService.fetchProducts('beauty');
    this.sharedService.productsArray$.subscribe((products) => {
      this.beautyProducts = products;
    });
  }
}
