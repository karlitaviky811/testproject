import { Component, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Shopping } from '../../../core/interfaces/shopping';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-shopping-detail',
  standalone: true,
  imports: [TableModule, ButtonComponent],
  templateUrl: './shopping-detail.component.html',
  styleUrl: './shopping-detail.component.scss'
})
export default class ShoppingDetailComponent {
  shoppings = signal<Shopping[]>([]);
  
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
}
