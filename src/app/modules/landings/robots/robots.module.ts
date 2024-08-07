import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardRobotComponent } from './card-robot/card-robot.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
@NgModule({
  declarations: [CardRobotComponent],
  imports: [
    CommonModule,
    ButtonComponent,
  ],
  exports: [CardRobotComponent]
})
export class RobotsModule { }
