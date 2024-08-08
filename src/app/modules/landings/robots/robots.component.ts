import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { RobotsModule } from './robots.module';
import { Robot } from '../../../core/interfaces/robot';
import { Router } from '@angular/router';
import { BannerComponent } from '../../../shared/components/banner/banner.component';
import { RobotService } from '../../../core/services/robot_service';
import { PurchaseService } from '../../../core/services/purchase_service';

@Component({
  selector: 'app-robots',
  standalone: true,
  imports: [RobotsModule, BannerComponent],
  providers: [RobotService],
  templateUrl: './robots.component.html',
  styleUrl: './robots.component.scss'
})
export default class RobotsComponent implements OnInit {
  title = 'ROBOT DE TRADING';
  robots: WritableSignal<Robot[]> = signal<Robot[]>([]);
  routerService = inject(Router);
  private readonly robotService = inject(RobotService);
  
  constructor() {
    this.robots.set([
    ]);
  }

  ngOnInit(): void {
    this.robotService.getRobots().subscribe({
      next: (res) => {
          this.robots.set(res);
      }
    });
  }

  handleEventRobot(robot: Robot) {
    this.routerService.navigate(['site/robot-detail', robot.id]);
  }
}
