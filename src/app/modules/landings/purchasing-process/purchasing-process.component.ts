import {
  Component,
  Input,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from "@angular/core";
import { StepperModule } from "primeng/stepper";
import { ButtonModule } from "primeng/button";
import { Router } from "@angular/router";
import { PurchasingProcessModule } from "./purchasing-process.module";
import { License } from "../../../core/interfaces/license";
import { LicenseService } from "../../../core/services/licenses_service";
import { StrategyService } from "../../../core/services/strategy_service";
import { PurchaseService } from "../../../core/services/purchase_service";
import { RobotService } from "../../../core/services/robot_service";
import { Robot } from "../../../core/interfaces/robot";

@Component({
  selector: "app-purchasing-process",
  standalone: true,
  imports: [StepperModule, ButtonModule, PurchasingProcessModule],
  providers: [LicenseService, StrategyService, RobotService],
  templateUrl: "./purchasing-process.component.html",
  styleUrl: "./purchasing-process.component.scss",
})
export default class PurchasingProcessComponent implements OnInit {
  @Input() id = "";

  active: number | undefined = 0;

  private readonly router = inject(Router);
  private readonly licenseService = inject(LicenseService);
  private readonly robotService = inject(RobotService);
  private readonly purchaseService = inject(PurchaseService);

  private readonly _robot: WritableSignal<Robot> = signal({} as Robot);

  colors = ["Red", "Blue", "White"];
  licenses = signal<License[]>([]);

  ngOnInit(): void {
    if (this.id) {
      this.robotService.getRobotById(Number(this.id)).subscribe({
        next: (res) => {
          this._robot.set(res);
          this.purchaseService.getCartId().subscribe((item) => {
            this.purchaseService.updateCartItem({
              id: 0,
              itemName: res.name,
              itemType: "ROBOT",
              itemElementId: res.id,
              itemPrice: 200.0,
              quantity: 1,
              totalPrice: 200.0,
              shoppingCartId:  item.id,
              itemsExtra: [],
            });
          });
        },
      });
    }

    this.licenseService.getLicenses().subscribe({
      next: (res) => {
        this.licenses.set(res);
        console.log(this.licenses());
      },
    });
  }

  get robot(): Robot {
    return this._robot();
  }

  onActiveIndexChange(e: any) {
    console.log("hey");
  }
}
