import { Component } from '@angular/core';
import { HomeModule } from './home.module';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeModule, ButtonComponent, CommonModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent {
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
  
}
