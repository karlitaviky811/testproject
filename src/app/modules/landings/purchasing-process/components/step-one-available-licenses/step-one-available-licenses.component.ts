import { Component, EventEmitter, Output, computed, inject, signal } from '@angular/core';
import { License } from '../../../../../core/interfaces/license';
import { LicenseService } from '../../../../../core/services/licenses_service';
import { PurchaseService } from '../../../../../core/services/purchase_service';

@Component({
  selector: 'app-step-one-available-licenses',
  templateUrl: './step-one-available-licenses.component.html',
  styleUrl: './step-one-available-licenses.component.scss'
})
export class StepOneAvailableLicensesComponent {
  @Output() nextCallback: EventEmitter<any> = new EventEmitter();
  private readonly licenseService = inject(LicenseService);
  readonly purchaseService = inject(PurchaseService);
  // choseLicense = computed(() => this.purchaseService.selectedLicense());

  selectedLicense!: License;

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
    this.purchaseService.selectedLicense.set(license);
  }
}
