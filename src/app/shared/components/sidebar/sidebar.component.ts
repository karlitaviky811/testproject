import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth_service';

interface Menu {
  id: number;
  name: string;
  path?: string;
  callback?: () => void;
}
@Component({
  selector: 'fwa-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  private readonly authService = inject(AuthService);
  private readonly routerService = inject(Router);

  menu: Menu[] = [{
    id: 1,
    name: 'Perfil',
    path: '/admin/profile',
  },
  {
    id: 2,
    name: 'Mis compras',
    path: '/admin/shopping',
  },
  {
    id: 3,
    name: 'Robots y licencias',
    path: '/admin/robots-license',
  },
  {
    id: 4,
    name: 'Cerrar sesión',
    path: '/admin/profile',
    callback: () => this.logout()
  },
  ];

  logout() {
    this.authService.logout()
  }

  navigateTo({ path }: Menu) {
    this.routerService.navigate([path]);
  }
}
