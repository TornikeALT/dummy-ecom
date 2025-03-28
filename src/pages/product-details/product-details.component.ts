import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SingleProductService } from '../../service/single-product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../interface/product';
import { Observable, switchMap } from 'rxjs';
import { CartService } from '../../service/cart.service';
import { LazyLoadDirective } from '../../directives/lazy-load.directive';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, FormsModule, LazyLoadDirective, ModalComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  productId!: string;
  productData$!: Observable<Product>;
  selectedQuantity: number = 1;
  selectedImage: string = '';
  showModal = false;

  constructor(
    private route: ActivatedRoute,
    private singleProduct: SingleProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.productData$ = this.route.paramMap.pipe(
      switchMap((params) =>
        this.singleProduct.getProductById(params.get('id')!)
      )
    );
  }

  addToCart(product: Product) {
    const quantityNumber = Number(this.selectedQuantity);
    this.cartService.addToCart({ ...product, quantity: quantityNumber });
  }
  handleImgChange(index: number, images: string[]) {
    this.selectedImage = images[index];
  }
  handleShowModal(image: string) {
    this.selectedImage = image;
    this.showModal = true;
  }
  handleCloseModal() {
    this.showModal = false;
  }
}
