import { Component } from '@angular/core';
import { RobotStrategiesModule } from './robot-strategies.module';
import { CardStrategyComponent } from '../../../shared/components/card-strategy/card-strategy.component';
import { PaginatorModule } from 'primeng/paginator';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-robot-strategies',
  standalone: true,
  imports: [RobotStrategiesModule, CardStrategyComponent, PaginatorModule],
  templateUrl: './robot-strategies.component.html',
  styleUrl: './robot-strategies.component.scss'
})
export default class RobotStrategiesComponent {

  first: number = 0;

    rows: number = 10;

    onPageChange(event: PageEvent) {
        this.first = event.first;
        this.rows = event.rows;
    }

}
