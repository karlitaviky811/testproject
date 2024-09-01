import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';
import { ShoppingDetailComponent } from './components/shopping-detail/shopping-detail.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { TableModule } from 'primeng/table';
import { ProductService } from '../../../core/services/product_service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { BadgeModule } from 'primeng/badge';


@NgModule({
  declarations: [
    CartComponent,
    ShoppingDetailComponent,
    
  ],
  imports: [
    CommonModule,
    ButtonComponent,
    TableModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
    ReactiveFormsModule,
    BadgeModule,
  ],
   exports: [
    CartComponent,
    ShoppingDetailComponent,
    DropdownModule,
    ReactiveFormsModule
   ],
   providers: [
    ProductService,
   ]
})
export class ShoppingCartModule { }
