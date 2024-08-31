import { Component, EventEmitter, Input, Output, computed, inject, input, signal, effect, WritableSignal } from '@angular/core';
import { License } from '../../../../../core/interfaces/license';
import { LicenseService } from '../../../../../core/services/licenses_service';
import { PurchaseService } from '../../../../../core/services/purchase_service';
import { Robot } from '../../../../../core/interfaces/robot';

@Component({
  selector: 'app-step-one-available-licenses',
  templateUrl: './step-one-available-licenses.component.html',
  styleUrl: './step-one-available-licenses.component.scss'
})
export class StepOneAvailableLicensesComponent {
  robot = input.required<WritableSignal<Robot>>();
  @Output() nextCallback: EventEmitter<any> = new EventEmitter();

  private readonly licenseService = inject(LicenseService);
  readonly purchaseService = inject(PurchaseService);
  
  selectedLicense!: License;
  isStepValid = computed(() => Object.keys(this.purchaseService.selectedLicense()).length <= 0);
  licenses = signal<License[]>([]);

  constructor() {
    effect(() => {
      if ( this.robot()().id ) {
        this.licenseService.getLicensesByRobotId(this.robot()().id)
          .subscribe({
            next: (res) => {
              this.licenses.set(res);
            }
          });
        }
    })
  }

  handleSelectedItem(license: License) {
    this.selectedLicense = license;
    this.purchaseService.selectedLicense = license;

    this.purchaseService.cartItem().itemPrice = Number(license.price);
    this.purchaseService.cartItem().totalPrice =  Number(license.price);
    this.purchaseService.cartItem().itemsExtra.push({
      itemName: license.name,
      itemType: 'LICENSE',
      itemElementId: license.id,
      itemPrice: Number(0),
      quantity: 1,
      totalPrice: Number(0),
    });


    console.log('heeeeeyyyyyy',this.purchaseService.cartItem().itemsExtra )
  }
}
