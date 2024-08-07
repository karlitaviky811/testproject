import { NgClass } from '@angular/common';
import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-alert-message',
  standalone: true,
  imports: [ NgClass],
  templateUrl: './alert-message.component.html',
  styleUrl: './alert-message.component.scss',
})
export class AlertMessageComponent {
  customTitle = input<string>('test');
  customIcon = input<string>('');
  customColor = input<string>('');
}
