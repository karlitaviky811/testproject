import { Component, inject, OnInit, signal } from "@angular/core";
import { RobotStrategiesModule } from "./robot-strategies.module";
import { CardStrategyComponent } from "../../../shared/components/card-strategy/card-strategy.component";
import { PaginatorModule } from "primeng/paginator";
import { BannerComponent } from "../../../shared/components/banner/banner.component";
import { ActivatedRoute, Router } from "@angular/router";
import { StrategyService } from "../../../core/services/strategy_service";
import { RobotService } from "../../../core/services/robot_service";
import { CommonModule } from "@angular/common";
import { PurchaseService } from "../../../core/services/purchase_service";
interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: "app-robot-strategies",
  standalone: true,
  imports: [
    RobotStrategiesModule,
    CardStrategyComponent,
    PaginatorModule,
    BannerComponent,
    CommonModule,
  ],
  providers: [StrategyService],
  templateUrl: "./robot-strategies.component.html",
  styleUrl: "./robot-strategies.component.scss",
})
export default class RobotStrategiesComponent implements OnInit {
  title = "ESTRATEGIAS DE ROBOT";
  first: number = 0;
  activatedRoute = inject(ActivatedRoute);
  route = inject(Router);
  strategySrv = inject(StrategyService);
  robotgySrv = inject(RobotService);
  purchaseService = inject(PurchaseService);
  rows: number = 10;
  dataStrategy = signal<any[]>([]);
  ensambledRobotId = "";
  show = false;
  robotEnsambledUser: any;
  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
  }

  ngOnInit() {
    const queryParams = this.activatedRoute.snapshot.queryParamMap;
    let id = Number(queryParams.get("id"));
    let ensambledId = queryParams.get("robotEnsambled");
    this.ensambledRobotId = ensambledId ? ensambledId : "";
    this.strategySrv.getStrategiesByRobotId(id).subscribe((strategies: any) => {
      this.robotgySrv
        .getRobotEnsambledId(this.ensambledRobotId)
        .subscribe((ensambled) => {
          this.robotEnsambledUser = ensambled;
          this.containsStrategies(strategies, ensambled.strategies);
          this.dataStrategy.set(strategies);
        });
    });
  }

  netPayment() {
    this.route.navigate([
      "shopping-cart",
      ,
      { queryParams: { robotEnsambled: this.ensambledRobotId } },
    ]);
  }

  containsStrategies(strategies: any, robotEnsambled: any) {
    for (let i = 0; i < strategies.length; i++) {
      for (let j = 0; j < robotEnsambled.length; j++) {
        strategies[i].shoppingItem = false;
        if (strategies[i].id == robotEnsambled[j].id) {
          strategies[i].selected = true;
        } else {
          strategies[i].selected = false;
        }
      }
    }
  }

  goCart() {
  
    var strategies: any = [];
    var params = {};

    this.purchaseService.updateCartItem({
      id: 0,
      itemName: this.robotEnsambledUser.robot.name,
      itemType: "ROBOT",
      itemElementId: this.robotEnsambledUser.robot.id,
      robotLicenseStrategyId: Number(this.robotEnsambledUser.id),
      itemPrice: 0,
      quantity: 1,
      totalPrice: 0,
      shoppingCartId: 1,
      itemsExtra: [],
    });
    this.dataStrategy().map((i) => {
      if (i.shoppingItem) {
        strategies.push(i.id);

        this.purchaseService.cartItem().itemsExtra.push({
          itemName: i.name,
          itemType: "STRATEGY",
          itemElementId: i.id,
          itemPrice: Number(i.price),
          quantity: 1,
          totalPrice: Number(i.price),
        });
      }
      params = { queryParams: { strategies } };
    });

    this.show = true;
    const item = this.purchaseService.cartItem();
    item.itemsExtra.map((i) => {
      if (i.itemType == "LICENSE") {
        i.totalPrice = 0;
        i.itemPrice = 0;
      }
    });


    this.purchaseService.addProduct(item).subscribe({
      next: (res) => {
        this.route.navigate(["site/shopping-cart"]);
        this.show = false;
      },
    });

    //this.route.navigate(["site/shopping-cart"], params);
  }
}
