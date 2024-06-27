import { Component, inject, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Shopping } from '../../../core/interfaces/shopping';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping',
  standalone: true,
  imports: [TableModule, ButtonComponent],
  templateUrl: './shopping.component.html',
  styleUrl: './shopping.component.scss'
})
export default class ShoppingComponent {
  shoppings = signal<Shopping[]>([]);

  private readonly routerService = inject(Router);

  constructor() {
    this.shoppings.set([
      {
        id: '1',
        code: '#445',
        date: 'mayo 23, 2024',
        status: 'Completado',
        total: 'Bs.0,00 para 1 artículo',
      },
      {
        id: '2',
        code: '#445',
        date: 'mayo 23, 2024',
        status: 'Completado',
        total: 'Bs.0,00 para 1 artículo',
      },
      {
        id: '3',
        code: '#445',
        date: 'mayo 23, 2024',
        status: 'Completado',
        total: 'Bs.0,00 para 1 artículo',
      },
    ]);
  }

  navigateToDetail(shopping: Shopping) {
    this.routerService.navigate(['/admin/shopping-detail', shopping.id]);
  }
}
