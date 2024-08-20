import { Component, inject } from '@angular/core';
import { BannerComponent } from '../../../shared/components/banner/banner.component';
import {  FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../../core/services/users_service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [BannerComponent, FormsModule, ReactiveFormsModule,     ConfirmDialogModule,
    ToastModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export default class ContactComponent {
  title = '¿NO TIENES TIEMPO PARA ANALIZAR TUS ACTIVOS?';
  lat = 51.678418;
  lng = 7.809007;
  formBuilder = inject(FormBuilder);
  userInformationForm: FormGroup;
  user = inject(UsersService)
  idUser = 0;
  confirmationService!: ConfirmationService;
  messageService!: MessageService;




  constructor() {
    this.userInformationForm = this.formBuilder.group({
      name: [''],
      email: [''],
      subject: [''],
      message: [''],

    });

    this.confirmationService = inject(ConfirmationService);
    this.messageService = inject(MessageService);
  }

  sendMessage(dataMessage: any){
    let data ={
      "name": dataMessage.name,
      "email": dataMessage.email,
      "affair": dataMessage.subject,
      "message": dataMessage.message
    }
   


    this.confirmationService.confirm({
      header: 'Esta seguro de enviar este mensaje?',
      message: 'Por favor acepte, para continuar',
      accept: () => {
       
        this.user.sendMessage(data).subscribe((res : any)=>{
          console.log('send message')
          this.userInformationForm.reset();
        })
        this.messageService.add({ severity: 'info', summary: 'Exito', detail: 'Se ha enviado exitosamente', life: 3000 });
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ha cancelado el envio', life: 3000 });
      }
  });
  }
  
}
