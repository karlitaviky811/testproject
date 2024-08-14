import { Component, inject, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Shopping } from '../../../core/interfaces/shopping';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { Router, RouterModule, ActivatedRoute  } from '@angular/router';
import { PurchaseService } from '../../../core/services/purchase_service';

@Component({
  selector: 'app-shopping-detail',
  standalone: true,
  imports: [TableModule, ButtonComponent, RouterModule],
  templateUrl: './shopping-detail.component.html',
  styleUrl: './shopping-detail.component.scss'
})
export default class ShoppingDetailComponent implements OnInit {
  shoppings = signal<Shopping[]>([]);
  route = inject(Router)
  activatedRoute = inject(ActivatedRoute)
  purchaseShopping = inject(PurchaseService)
  products = [];
  constructor() {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((data : any)=>{
      console.log(data.params.id)
      const indexStrategy = this.purchaseShopping.shoppingUserData().findIndex( (item : any) => data.params.id == item.id)
    this.products=  this.purchaseShopping.shoppingUserData()[indexStrategy].items
      console.log('epaaaleee', this.products)
    })

  }
}
