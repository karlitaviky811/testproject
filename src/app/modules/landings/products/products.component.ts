import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AlertMessageComponent } from '../../../shared/components/alert-message/alert-message.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';
import { BannerComponent } from '../../../shared/components/banner/banner.component';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ButtonComponent,
    AlertMessageComponent,
    CommonModule,
    TranslateModule,
    RouterModule,
    BannerComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export default class ProductsComponent {
  title = '¿NO TIENES TIEMPO PARA ANALIZAR TUS ACTIVOS?';
  route = inject(Router)
  characteristic1 = [
    {
      title: 'Asesor Experto',
      icon: 'check.png',
      color: '#C9DCF2',
    },
    {
      title: 'Asesoría para instalación del servidor VPS',
      icon: 'check.png',
      color: '#E9F2FD',
    },
    {
      title: 'Paquete de estrategias para diferentes pares pre diseñadas de acuerdo a su capital',
      icon: 'check.png',
      color: '#C9DCF2',
    },
    {
      title: 'Asesoría de gestión de riesgo',
      icon: 'check.png',
      color: '#E9F2FD',
    },
    {
      title: 'Asesoría de funcionamiento del robot',
      icon: 'check.png',
      color: '#C9DCF2',
    },
  ];

  characteristic2 = [
    {
      title: 'Tendrás operativas con un 75% de asertividad',
      icon: 'check.png',
      color: '#C9DCF2',
    },
    {
      title: 'Relación Riesgo / Beneficios mayores a 1.5',
      icon: 'check.png',
      color: '#E9F2FD',
    },
    {
      title: 'Envío de señales de 3 a 5 diarias',
      icon: 'check.png',
      color: '#C9DCF2',
    },
    {
      title: 'Clases en vivo',
      icon: 'check.png',
      color: '#E9F2FD',
    },
    {
      title: 'Transmisiones de análisis en vivo',
      icon: 'check.png',
      color: '#C9DCF2',
    },
    {
      title: 'Clases de Gestión de Riesgo',
      icon: 'check.png',
      color: '#E9F2FD',
    },
  ];
  handleClick() {
 
  }

  goCart(){
    this.route.navigate(['/site/robots'])
  }
}
