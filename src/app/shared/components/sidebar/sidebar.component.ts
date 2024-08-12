import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth_service';

@Component({
  selector: 'fwa-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  authSrv = inject(AuthService);
  logout(){
    this.authSrv.logout()
  }
}
