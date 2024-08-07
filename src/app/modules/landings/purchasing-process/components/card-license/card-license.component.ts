import { Component, EventEmitter, Input, Output, Signal, input } from '@angular/core';
import { License } from '../../../../../core/interfaces/license';

@Component({
  selector: 'card-license',
  templateUrl: './card-license.component.html',
  styleUrl: './card-license.component.scss'
})
export class CardLicenseComponent {
  @Input() license!: License;
  @Input() selected: boolean = false;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
}
