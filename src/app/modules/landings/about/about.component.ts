import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AboutModule } from './about.module';
import { BannerComponent } from '../../../shared/components/banner/banner.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ButtonComponent, AboutModule, BannerComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export default class AboutComponent {
  title = '¿NO TIENES TIEMPO PARA ANALIZAR TUS ACTIVOS?';

}
