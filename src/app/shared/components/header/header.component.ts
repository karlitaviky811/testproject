import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'fwa-header',
  standalone: true,
  imports: [ButtonComponent, RouterModule, CommonModule  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  show : boolean = false;
  private readonly routerService = inject(Router);

  routeOptions = [
    {
      name: 'HOME',
      path: '',
    },
    {
      name: 'SERVICIOS Y PRODUCTOS',
      path: 'site/products',
    },
    {
      name: 'NOSOTROS',
      path: 'site/about',
    },
    {
      name: 'TIENDA',
      path: 'site/robots',
    },
    {
      name: 'CONTACTO',
      path: 'site/contact',
    },
    {
      name: 'ES',
      path: '#',
    },
    {
      name: 'LOGIN',
      path: '/sign-in',
    },
    
  ]

  handleClick(route: string) {
    //this.routerService.navigate(['site/contact']);
    this.routerService.navigate([route]);
  }

  openMenu(){
    this.show = !this.show
  }
}
