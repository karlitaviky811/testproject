import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-payment-methods',
  standalone: true,
  imports: [FormsModule, CheckboxModule],
  templateUrl: './payment-methods.component.html',
  styleUrl: './payment-methods.component.scss'
})
export default class PaymentMethodsComponent {
  checked: boolean = false;
  router = inject(Router);

  
  goCart() {
    this.router.navigate(['site/shopping-cart']);
  }
}
