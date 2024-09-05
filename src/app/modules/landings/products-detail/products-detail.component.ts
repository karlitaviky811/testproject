import { Component, inject, output } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AlertMessageComponent } from '../../../shared/components/alert-message/alert-message.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ProductsDetailModule } from './products-detail.module';
import { BannerComponent } from '../../../shared/components/banner/banner.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-products-detail',
  standalone: true,
  imports: [
    ButtonComponent,
    AlertMessageComponent,
    CommonModule,
    TranslateModule,
    ProductsDetailModule,
    BannerComponent
  ],
  templateUrl: './products-detail.component.html',
  styleUrl: './products-detail.component.scss',
})
export default class ProductsDetailComponent {
  title = '¿NO TIENES TIEMPO PARA ANALIZAR TUS ACTIVOS?';
  route = inject(Router)
  onClick = output();
  pDetail = [
    {
      title: 'Introducción al trading',
      icon: 'check.png',
      color: '#C9DCF2',
    },
    {
      title: 'Tipo de operaciones',
      icon: 'check.png',
      color: '#E9F2FD',
    },
    {
      title: 'CFD',
      icon: 'check.png',
      color: '#C9DCF2',
    },
    {
      title: 'Mercados',
      icon: 'check.png',
      color: '#E9F2FD',
    },
    {
      title: 'Horarios de trading',
      icon: 'check.png',
      color: '#C9DCF2',
    },
    {
      title: 'Análisis técnico',
      icon: 'check.png',
      color: '#E9F2FD',
    },
    {
      title: 'Indicadores Básicos',
      icon: 'check.png',
      color: '#C9DCF2',
    },
  ];

  pDetail2 = [
    {
      title: '¿Qué es el trading?',
      icon: 'check.png',
      color: '#C9DCF2',
    },
    {
      title: 'Trading subyacente',
      icon: 'check.png',
      color: '#E9F2FD',
    },
    {
      title: 'Terminología básica',
      icon: 'check.png',
      color: '#C9DCF2',
    },
    {
      title: 'Participantes del mercado',
      icon: 'check.png',
      color: '#E9F2FD',
    },
    {
      title: 'Calculo de lote',
      icon: 'check.png',
      color: '#C9DCF2',
    },
    {
      title: 'Estrategia PIP Hunters',
      icon: 'check.png',
      color: '#E9F2FD',
    },
    {
      title: 'Psicología de traders para principiantes',
      icon: 'check.png',
      color: '#C9DCF2',
    },
  ];
  handleClick() {
  
  }

  goShoppingCart(){
    this.route.navigate(['/site/shopping-cart'])
  }
}
