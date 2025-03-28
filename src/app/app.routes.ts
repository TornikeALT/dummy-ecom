import { Routes } from '@angular/router';
import { BeautyComponent } from '../pages/beauty/beauty.component';
import { MenWatchesComponent } from '../pages/men-watches/men-watches.component';
import { MenShoesComponent } from '../pages/men-shoes/men-shoes.component';
import { MenShirtsComponent } from '../pages/men-shirts/men-shirts.component';
import { LaptopsComponent } from '../pages/laptops/laptops.component';
import { GroceriesComponent } from '../pages/groceries/groceries.component';
import { FurnitureComponent } from '../pages/furniture/furniture.component';
import { ProductDetailsComponent } from '../pages/product-details/product-details.component';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';
import { HomeComponent } from '../pages/home/home.component';
import { CartComponent } from '../pages/cart/cart.component';
import { LoginComponent } from '../components/login/login.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { AuthGuard } from '../guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'beauty',
    children: [
      { path: '', component: BeautyComponent },
      { path: ':id', component: ProductDetailsComponent },
    ],
  },
  {
    path: 'men-watches',
    children: [
      { path: '', component: MenWatchesComponent },
      { path: ':id', component: ProductDetailsComponent },
    ],
  },
  {
    path: 'men-shoes',
    children: [
      { path: '', component: MenShoesComponent },
      { path: ':id', component: ProductDetailsComponent },
    ],
  },
  {
    path: 'men-shirts',
    children: [
      {
        path: '',
        component: MenShirtsComponent,
      },
      {
        path: ':id',
        component: ProductDetailsComponent,
      },
    ],
  },
  {
    path: 'laptops',
    children: [
      { path: '', component: LaptopsComponent },
      { path: ':id', component: ProductDetailsComponent },
    ],
  },
  {
    path: 'groceries',
    children: [
      { path: '', component: GroceriesComponent },
      { path: ':id', component: ProductDetailsComponent },
    ],
  },
  {
    path: 'furniture',
    children: [
      {
        path: '',
        component: FurnitureComponent,
      },
      { path: ':id', component: ProductDetailsComponent },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];
