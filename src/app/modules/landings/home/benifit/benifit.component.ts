import { Component, input } from '@angular/core';

@Component({
  selector: 'fwa-benifit',
  templateUrl: './benifit.component.html',
  styleUrl: './benifit.component.scss'
})
export class BenifitComponent {
  icon = input.required();
  title = input.required();
  description = input.required();

}
