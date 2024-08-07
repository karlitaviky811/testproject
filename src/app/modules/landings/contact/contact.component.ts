import { Component } from '@angular/core';
import { BannerComponent } from '../../../shared/components/banner/banner.component';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [BannerComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export default class ContactComponent {
  title = '¿NO TIENES TIEMPO PARA ANALIZAR TUS ACTIVOS?';

  lat = 51.678418;
  lng = 7.809007;
}
