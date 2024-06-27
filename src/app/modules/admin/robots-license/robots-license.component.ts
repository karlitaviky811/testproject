import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/button/button.component';


@Component({
  selector: 'app-robots-license',
  standalone: true,
  imports: [CommonModule, AccordionModule, ButtonComponent],
  templateUrl: './robots-license.component.html',
  styleUrl: './robots-license.component.scss',
})
export default class RobotsLicenseComponent {
  tabs = [
    {
      title: 'Robot de Forex',
      content: '',
      data: [
        {
          title: 'Licencia',
          content: 'ORO',
        },
        {
          title: 'N° de licencia',
          content: 'Lt6iCgu__B2-DC-45-1B',
        },
        {
          title: 'Estado',
          content: 'Activa',
        },
        {
          title: 'Expiración',
          content: '90 días',
        },
        {
          title: 'Estrategias',
          content: '+4',
        },
        {
          title: 'Certificado',
          content: '90 días',
        },
      ],
    },

  ];
}
