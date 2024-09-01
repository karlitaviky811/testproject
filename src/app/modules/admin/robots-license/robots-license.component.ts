import { Component, inject, OnInit } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { RobotService } from '../../../core/services/robot_service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-robots-license',
  standalone: true,
  imports: [CommonModule, AccordionModule, ButtonComponent],
  templateUrl: './robots-license.component.html',
  styleUrl: './robots-license.component.scss',
})
export default class RobotsLicenseComponent implements OnInit {
  robot = inject(RobotService)
  router = inject(Router)
  tabs = [
    {
      title: 'Robot de Forex',
      content: '',
      id: '0',
      robotId: '0',
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
    this.robot.getRobotEnsambledUser().subscribe((res: any)=>{
      res.map(  (i: any)=>{

        console.log('i ensambled', i.id)
        this.tabs.push( {
          title: i.robot.name,
          id: i.id,
          robotId: i.robot.id,
          content: '',
          data: [
            {
              title: 'Licencia',
              content: i.license,
            },
            {
              title: 'N de Licencia',
              content: i.licenseNumber,
            },
            {
              title: 'Estatus',
              content: i.status,
            },
            {
              title: 'Expiración',
              content: 90,
            },
            {
              title: 'Estrategias',
              content: i.strategies.length,
            },
            {
              title: 'Certificado',
              content: i.strategies.length,
            }
          
          ]
      })
      })
     
      console.log('res',res)
    })
  }

  seeStrategy(data: any) {
    console.log('data', data)
    this.router.navigate(['site/robot-strategies'], { queryParams: { id: +data.robotId, robotEnsambled: data.id}});
  }
}
