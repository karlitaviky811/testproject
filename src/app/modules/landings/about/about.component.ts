import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AboutModule } from './about.module';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ButtonComponent, AboutModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export default class AboutComponent {

}
