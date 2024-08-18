import { Component, Input, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RobotService } from '../../../core/services/robot_service';
import { Robot } from '../../../core/interfaces/robot';
import { DomSanitizer } from '@angular/platform-browser';
import { SvgIconComponent } from '../../../shared/components/svgicon/svgicon.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormControl, Validators , ReactiveFormsModule, FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth_service';
@Component({
  selector: 'app-robot-detail',
  standalone: true,
  imports: [ButtonComponent,CommonModule, SvgIconComponent, ButtonModule, DialogModule,ReactiveFormsModule,RouterModule, FormsModule, ReactiveFormsModule,
     ],
  providers: [RobotService],
  templateUrl: './robot-detail.component.html',
  styleUrl: './robot-detail.component.scss'
})
export default class RobotDetailComponent implements OnInit {
  @Input() id = '';

  private readonly routerService = inject(Router);
  private readonly robotService = inject(RobotService);
private readonly authSrv= inject(AuthService)
  private readonly _robot: WritableSignal<Robot> = signal({} as Robot);
  visible: boolean = false;
  formgroup = new FormBuilder().group({
    email: new FormControl('', [Validators.minLength(2),Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required])}
  );
  showDialog() {
      this.visible = true;
  }

  closeDialog() {
      this.visible = false;
  }
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

    if(this.authSrv.isAuthenticated()){
      this.routerService.navigate(['/site/purchasing-process', this.id]);
    }else{
      this.routerService.navigate(['/sign-in']);
    }
   
  }

  sigIn(data: any){
    console.log('data', data)
  }
}
