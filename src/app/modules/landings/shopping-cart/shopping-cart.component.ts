import { Component, inject } from '@angular/core';
import { ShoppingCartModule } from './shopping-cart.module';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';
import { BannerComponent } from '../../../shared/components/banner/banner.component';
import { PurchaseService } from '../../../core/services/purchase_service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [ShoppingCartModule, ButtonComponent, TableModule, BannerComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export default class ShoppingCartComponent {
  title = 'CARRITO DE COMPRA';

  router = inject(Router);
  purchaseService = inject(PurchaseService);

  seeStrategy() {
    this.router.navigate(['site/robot-strategies']);
  }

}
