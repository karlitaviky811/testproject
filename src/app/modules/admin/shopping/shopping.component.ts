import { Component, inject, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Shopping } from '../../../core/interfaces/shopping';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { Router } from '@angular/router';
import { UsersService } from '../../../core/services/users_service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartService } from '../../../core/services/cart_service';
import { PurchaseService } from '../../../core/services/purchase_service';
import {DatePipe} from '@angular/common';
@Component({
  selector: 'app-shopping',
  standalone: true,
  imports: [TableModule, ButtonComponent, DatePipe],
  templateUrl: './shopping.component.html',
  styleUrl: './shopping.component.scss'
})
export default class ShoppingComponent {
  shoppings = signal<Shopping[]>([]);

  private readonly routerService = inject(Router);
  formBuilder = inject(FormBuilder);
  userInformationForm!: FormGroup;
  user = inject(UsersService)
  cart = inject(CartService)
  purchaseShopping = inject(PurchaseService)
  idUser = 0;
  confirmationService!: ConfirmationService;
  messageService!: MessageService;
  constructor() {
    this.user.getData().subscribe(res=>{
      this.idUser = res.id
      this.user.updateLoginUser(res.name)
      this.getDataShopping()
    })
  }

  navigateToDetail(shopping: Shopping) {
    this.routerService.navigate(['/admin/shopping-detail', shopping.id]);
  }
  getDataShopping(){
    this.cart.getAllShopping(this.idUser).subscribe((data : any)=>{
      console.log('data list', data)
      let newData : any = [];
      data.data.forEach( (element : any) => {
          newData.push({
            id: element.id,
            code: element.id,
            date: element.updatedAt,
            status: element.approved ? 'Completado' : 'Pendiente',
            total: element.total,
            items: element.items,
          },)
      });
   
      this.shoppings.set(newData)
      this.purchaseShopping.shoppingUserChange =newData;
    })
  }
}
