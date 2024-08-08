import { Component, Input, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RobotService } from '../../../core/services/robot_service';
import { Robot } from '../../../core/interfaces/robot';

@Component({
  selector: 'app-robot-detail',
  standalone: true,
  imports: [ButtonComponent],
  providers: [RobotService],
  templateUrl: './robot-detail.component.html',
  styleUrl: './robot-detail.component.scss'
})
export default class RobotDetailComponent implements OnInit {
  @Input() id = '';

  private readonly routerService = inject(Router);
  private readonly robotService = inject(RobotService);

  private readonly _robot: WritableSignal<Robot> = signal({} as Robot);

  
  ngOnInit(): void {
    if (this.id) {
      this.robotService.getRobotById(Number(this.id))
      .subscribe({
        next: (res) => {
          this._robot.set(res);
        }
      })
    }
  }

  get robot(): Robot {
    return this._robot();
  }

  goPurchasingProcess() {
    this.routerService.navigate(['/site/purchasing-process', this.id]);
  }
}
