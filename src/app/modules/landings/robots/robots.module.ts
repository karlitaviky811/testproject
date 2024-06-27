import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardRobotComponent } from './card-robot/card-robot.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { BannerComponent } from './banner/banner.component';

@NgModule({
  declarations: [CardRobotComponent, BannerComponent],
  imports: [
    CommonModule,
    ButtonComponent,
  ],
  exports: [CardRobotComponent, BannerComponent]
})
export class RobotsModule { }
