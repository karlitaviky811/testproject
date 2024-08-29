import { Component, inject, OnInit } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { RobotService } from '../../../core/services/robot_service';


@Component({
  selector: 'app-robots-license',
  standalone: true,
  imports: [CommonModule, AccordionModule, ButtonComponent],
  templateUrl: './robots-license.component.html',
  styleUrl: './robots-license.component.scss',
})
export default class RobotsLicenseComponent implements OnInit {
  robot = inject(RobotService)
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

  ngOnInit(): void {
      this.obtainRobotsEnsambledForUser()
  }


  obtainRobotsEnsambledForUser(){
    this.robot.getRobotEnsambledUser().subscribe(res=>{
      res.map(  (i: any)=>{
        this.tabs = [
          {
            title: 'Robot de Forex',
            content: '',
            data: [
              {
                title: 'Licencia',
                content: 'ORO',
              }
            ]
            }]
      })
     
      console.log('res',res)
    })
  }
}
