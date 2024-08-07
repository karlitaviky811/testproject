import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';
import { ShoppingDetailComponent } from './components/shopping-detail/shopping-detail.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { TableModule } from 'primeng/table';
import { ProductService } from '../../../core/services/product_service';



@NgModule({
  declarations: [
    CartComponent,
    ShoppingDetailComponent,
    
  ],
  imports: [
    CommonModule,
    ButtonComponent,
    TableModule,
  ],
   exports: [
    CartComponent,
    ShoppingDetailComponent
   ],
   providers: [
    ProductService,
   ]
})
export class ShoppingCartModule { }
