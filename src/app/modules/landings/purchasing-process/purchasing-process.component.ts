import { Component, OnInit, inject, signal } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { PurchasingProcessModule } from './purchasing-process.module';
import { License } from '../../../core/interfaces/license';
import { LicenseService } from '../../../core/services/licenses_service';
import { StrategyService } from '../../../core/services/strategy_service';
import { PurchaseService } from '../../../core/services/purchase_service';

@Component({
  selector: 'app-purchasing-process',
  standalone: true,
  imports: [StepperModule,ButtonModule, PurchasingProcessModule],
  providers: [LicenseService, StrategyService, PurchaseService],
  templateUrl: './purchasing-process.component.html',
  styleUrl: './purchasing-process.component.scss'
})
export default class PurchasingProcessComponent implements OnInit {
  active: number | undefined = 0;

  router = inject(Router);
  private readonly licenseService = inject(LicenseService);

  colors = ["Red", "Blue", "White"];
  licenses = signal<License[]>([]);

  ngOnInit(): void {
    this.licenseService.getLicenses().subscribe({
      next: (res) => {
        this.licenses.set(res);
        console.log(this.licenses());
      }
    });
  }

  onActiveIndexChange(e: any){
    console.log('hey')
  }
}
