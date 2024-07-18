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
    {
      name: 'CONTACTO',
      path: 'contact',
    },
    {
      name: 'ES',
      path: '#',
    },
    {
      name: 'LOGIN',
      path: 'site/sign-in',
    },
    
  ]

  handleClick(route: string) {
    //this.routerService.navigate(['site/contact']);
    console.log('route')
    this.routerService.navigate([route]);
  }

  openMenu(){
    console.log('heeeeyyy')
    this.show = !this.show
  }
}
