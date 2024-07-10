import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'fwa-header',
  standalone: true,
  imports: [ButtonComponent, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private readonly routerService = inject(Router);

  routeOptions = [
    {
      name: 'SERVICIOS Y PRODUCTOS',
      path: 'products',
    },
    {
      name: 'NOSOTROS',
      path: 'about',
    },
    {
      name: 'TIENDA',
      path: 'robots',
    },
    
  ]

  handleClick(route: string) {
    //this.routerService.navigate(['site/contact']);
    console.log('route')
    this.routerService.navigate([route]);
  }
}
