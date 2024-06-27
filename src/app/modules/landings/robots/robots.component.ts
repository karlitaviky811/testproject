import { Component, inject, signal } from '@angular/core';
import { RobotsModule } from './robots.module';
import { Robot } from '../../../core/interfaces/robot';
import { Router } from '@angular/router';

@Component({
  selector: 'app-robots',
  standalone: true,
  imports: [RobotsModule],
  templateUrl: './robots.component.html',
  styleUrl: './robots.component.scss'
})
export default class RobotsComponent {
  robots = signal<Robot[]>([]);
  routerService = inject(Router);
  
  constructor() {
    this.robots.set([
      {
        id: '1',
        title: 'Robot de Forex',
        description: 'Apertura y cierre de operaciones',
        img: 'img/robot_forex.png',
      },
      {
        id: '2',
        title: 'Robot de Trading',
        description: 'Apertura y cierre de operaciones',
        img: 'img/robot_trading.png',
      },
      {
        id: '3',
        title: 'Robot de Forex',
        description: 'Apertura y cierre de operaciones',
        img: 'img/robot_forex.png',
      },
      {
        id: '4',
        title: 'Robot de Trading',
        description: 'Apertura y cierre de operaciones',
        img: 'img/robot_trading.png',
      },
      {
        id: '5',
        title: 'Robot de Forex',
        description: 'Apertura y cierre de operaciones',
        img: 'img/robot_forex.png',
      },
      {
        id: '6',
        title: 'Robot de Forex',
        description: 'Apertura y cierre de operaciones',
        img: 'img/robot_forex.png',
      },
    ]);
  }

  handleEventRobot() {
    this.routerService.navigate(['site/robot-detail']);
  }
}
