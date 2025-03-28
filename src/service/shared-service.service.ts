import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchProductsService {
  private productsArraySubject = new BehaviorSubject<any[]>([]);
  productsArray$ = this.productsArraySubject.asObservable();

  constructor() {}

  fetchProducts(url: string) {
    fetch(`https://dummyjson.com/products/category/${url}`)
      .then((res) => res.json())
      .then((data) => {
        this.productsArraySubject.next(data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
