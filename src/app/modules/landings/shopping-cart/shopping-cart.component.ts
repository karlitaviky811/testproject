import { Component, inject, OnInit } from "@angular/core";
import { ShoppingCartModule } from "./shopping-cart.module";
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { TableModule } from "primeng/table";
import { ActivatedRoute, Router } from "@angular/router";
import { BannerComponent } from "../../../shared/components/banner/banner.component";
import { PurchaseService } from "../../../core/services/purchase_service";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
@Component({
  selector: "app-shopping-cart",
  standalone: true,
  imports: [
    ShoppingCartModule,
    ButtonComponent,
    TableModule,
    BannerComponent,
    DialogModule,
    ButtonModule,
  ],
  templateUrl: "./shopping-cart.component.html",
  styleUrl: "./shopping-cart.component.scss",
})
export default class ShoppingCartComponent implements OnInit {
  title = "CARRITO DE COMPRA";
  show = false;
  visible: boolean = false;
  router = inject(Router);
  purchaseService = inject(PurchaseService);
  activatedRoute = inject(ActivatedRoute);
  strategiesNews: any;
  
  seeStrategy() {
    this.router.navigate(["site/robot-strategies"]);
  }

  showDialog() {
    this.visible = true;
  }

  ngOnInit(){
    const queryParams = this.activatedRoute.snapshot.queryParamMap;
   
    
    this.activatedRoute.queryParamMap.subscribe(params =>{
      this.strategiesNews = params.getAll('strategies')
      console.log('params', params) 
      
    });
  
    //this.purchaseService.addProduct().subscribe({})
  }

  
}
