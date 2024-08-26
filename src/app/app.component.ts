import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SpinnerService } from './core/services/spinner_service';
import { AuthService } from './core/services/auth_service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'fwa-frontend';
  authSrv = inject(AuthService);
  router = inject(Router);
  readonly spinnerService = inject(SpinnerService);

 


  ngOnInit(){
    console.log('heeeeyyy',this.authSrv.isTokenExpired(this.authSrv.getToken()))
    if (!this.authSrv.isTokenExpired(this.authSrv.getToken())){
        this.authSrv.logout()
    }
  }
}