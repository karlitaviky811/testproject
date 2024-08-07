import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { BannerComponent } from '../../shared/components/banner/banner.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-landing-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, BannerComponent, FooterComponent, ButtonComponent],
  templateUrl: './landing-layout.component.html',
  styleUrl: './landing-layout.component.scss'
})
export class LandingLayoutComponent {

  constructor() {
    console.log('landinglayoutcmp');
  }
}
