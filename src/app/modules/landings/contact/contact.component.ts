import { Component } from '@angular/core';
import { BannerComponent } from './banner/banner.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [BannerComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export default class ContactComponent {
  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;
}
