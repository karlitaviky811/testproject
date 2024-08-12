import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth_service';
import { UsersService } from '../../../core/services/users_service';

@Component({
  selector: 'fwa-header',
  standalone: true,
  imports: [ButtonComponent, RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  show: boolean = false;
  private readonly routerService = inject(Router);
  user = inject(UsersService);
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
  ];
  constructor(private authSrv: AuthService) {
 
  }

  ngOnInit(){
    this.validateRouter()
  }

  handleClick(route: string) {
    //this.routerService.navigate(['site/contact']);
    this.routerService.navigate([route]);
  }

  openMenu() {
    this.show = !this.show;
  }


  validateRouter(){
      var data = this.authSrv.getDataUser();
     
    if (data !== null) {
      console.log('hey', this.user.admin());
      this.routeOptions[6].name = data;
      this.routeOptions[6].path = 'admin';
    }else{
      this.routeOptions[6].name = 'LOGIN';
      this.routeOptions[6].path = 'sign-in';
    }
  }
}
