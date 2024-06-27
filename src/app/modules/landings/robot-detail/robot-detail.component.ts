import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-robot-detail',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './robot-detail.component.html',
  styleUrl: './robot-detail.component.scss'
})
export default class RobotDetailComponent {

}
