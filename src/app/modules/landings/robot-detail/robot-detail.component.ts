import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-robot-detail',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './robot-detail.component.html',
  styleUrl: './robot-detail.component.scss'
})
export default class RobotDetailComponent {
  private readonly routerService = inject(Router);


  handleClick() {
    this.routerService.navigate(['/site/purchasing-process']);
  }
}
