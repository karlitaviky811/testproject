import { Component, inject } from '@angular/core';
import { HomeModule } from './home.module';
import { CommonModule } from '@angular/common';
import { BannerComponent } from '../../../shared/components/banner/banner.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeModule, CommonModule, BannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent {
  title = 'EDÚCATE Y CONVIÉRTETE EN UN TRADER PROFESIONAL DESDE CERO';
  router = inject(Router)
  benifits: any[] = [
    {
      title: 'Fácil de aprender',
      icon: 'img/shield_icon.png',
      description: 'Nuestros cursos y clases están enfocadas en hacer llegar la información a nuestros estudiantes de la manera más sencilla, directa y práctica de aprender.',
    }, 
    {
      title: 'Traders capacitados',
      icon: 'img/laptop_icon.png',
      description: 'Todos nuestros traders tienen años de experiencia demostable.',
    },
    {
      title: 'Certificate con nosotros',
      icon: 'img/certificate_icon.png',
      description: 'Culmina cada uno de nuestros cursos y presenta nuestra prueba final tras cada curso para solicitar tu certificado.',
    }
  ];
  aboutUs(){
    this.router.navigate(['site/about'])
  }

  goCart(){
    this.router.navigate(['/site/robots'])
  }
}
