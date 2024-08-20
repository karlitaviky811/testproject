import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../../core/services/users_service';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, ButtonComponent, FormsModule, ReactiveFormsModule,
    ConfirmDialogModule,
    ToastModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export default class ProfileComponent implements OnInit {

  formBuilder = inject(FormBuilder);
  userInformationForm: FormGroup;
  user = inject(UsersService)
  idUser = 0;
  confirmationService: ConfirmationService;
  messageService: MessageService;
  constructor() {
    this.userInformationForm = this.formBuilder.group({
      name: [''],
      lastName: [''],
      email: [''],
      phone: [''],
      address: [''],
      oldpassword: [''],
      password: [''],
      checkpassword: ['']
    });
    this.confirmationService = inject(ConfirmationService);
    this.messageService = inject(MessageService);
    let userObject: any = localStorage.getItem("userObject");
    let user = JSON.parse(userObject)

    this.user.getData().subscribe(res=>{
      this.userInformationForm.patchValue(user.user)
      this.idUser = user.user.id
      this.user.updateLoginUser(res.name)
    })
  }
  
  ngOnInit(): void {
  }

  updateUserPassword(){
    console.log('hereee')

    this.confirmationService.confirm({
      header: '¿ Está seguro ?',
      message: 'Por favor acepte, para continuar',
      accept: () => {
       
        this.user.updatePassword({id:this.idUser, password: this.userInformationForm.get('password')?.value}).subscribe(res=>{
          console.log('res',res)
        })
          this.messageService.add({ severity: 'info', summary: 'Exito', detail: 'Se ha realizado el cambio de contraseña exitosamente', life: 3000 });
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ha cancelado el cambio de contraseña', life: 3000 });
      }
  });
   

}
}
