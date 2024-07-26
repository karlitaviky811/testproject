import { Component, Input, Signal, input } from '@angular/core';
import { Lincense } from '../../../../../core/interfaces/license';

@Component({
  selector: 'card-license',
  templateUrl: './card-license.component.html',
  styleUrl: './card-license.component.scss'
})
export class CardLicenseComponent {
  @Input() license!: Lincense;

}
