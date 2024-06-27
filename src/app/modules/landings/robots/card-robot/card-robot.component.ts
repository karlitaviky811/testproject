import { Component, input, output } from '@angular/core';
import { Robot } from '../../../../core/interfaces/robot';

@Component({
  selector: 'fwa-card-robot',
  templateUrl: './card-robot.component.html',
  styleUrl: './card-robot.component.scss'
})
export class CardRobotComponent {
  robot = input.required<Robot>();
  onClick = output();

}
