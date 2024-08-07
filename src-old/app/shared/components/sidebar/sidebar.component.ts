import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
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
  router = inject(Router);

  logout(): void {
    this.authSrv.logout();
  }
}
