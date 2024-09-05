import { NgClass } from '@angular/common';
import { Component, Input, computed, input, output } from '@angular/core';

@Component({
  selector: 'fwa-banner',
  standalone: true,
  imports: [NgClass],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {
  @Input() title = '';
  @Input() messageLink = '';
  @Input() backgroundImage = '';
  @Input() set height(value: String) {
    this._bannerHeight = 'lg:h-[' + value + 'px]';
  }

  get height(): String {
    return this._bannerHeight;
  }

  private _bannerHeight = 'lg:h-[500px]';
  onClick = output();
}
