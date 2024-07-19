import { Component, inject } from '@angular/core';
import { ShoppingCartModule } from './shopping-cart.module';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [ShoppingCartModule, ButtonComponent, TableModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export default class ShoppingCartComponent {
  router = inject(Router);

  seeStrategy() {
    this.router.navigate(['site/robot-strategies']);
  }

}
