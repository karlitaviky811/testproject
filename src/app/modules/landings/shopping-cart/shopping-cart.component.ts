import { Component, inject } from '@angular/core';
import { ShoppingCartModule } from './shopping-cart.module';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';
import { BannerComponent } from '../../../shared/components/banner/banner.component';

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

  seeStrategy() {
    this.router.navigate(['site/robot-strategies']);
  }

}
