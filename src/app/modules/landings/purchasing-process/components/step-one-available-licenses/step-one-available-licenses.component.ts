import { Component, EventEmitter, Input, Output, computed, inject, signal } from '@angular/core';
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
  @Input() robot = {} as Robot;
  @Output() nextCallback: EventEmitter<any> = new EventEmitter();

  private readonly licenseService = inject(LicenseService);
  readonly purchaseService = inject(PurchaseService);
  
  selectedLicense!: License;
  isStepValid = computed(() => Object.keys(this.purchaseService.selectedLicense()).length <= 0);
  licenses = signal<License[]>([]);

  ngOnInit(): void {
    this.licenseService.getLicenses().subscribe({
      next: (res) => {
        this.licenses.set(res);
      }
    });
  }

  handleSelectedItem(license: License) {
    this.selectedLicense = license;
    this.purchaseService.selectedLicense = license;
    // this.purchaseService.addItemToCart({
    //   id: 0,
    //   itemName: license.name,
    //   itemType: 'LICENSE',
    //   itemElementId: license.id,
    //   itemPrice: Number(license.price),
    //   quantity: 1,
    //   totalPrice: Number(license.price),
    //   extras: []
    // });

    this.purchaseService.cartItem().itemsExtra.push({
      itemName: license.name,
      itemType: 'LICENSE',
      itemElementId: license.id,
      itemPrice: Number(license.price),
      quantity: 1,
      totalPrice: Number(license.price),
    });
  }
}
