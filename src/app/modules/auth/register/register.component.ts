import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth_service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule,
    CommonModule,
    ConfirmDialogModule,
    ToastModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export default class RegisterComponent implements OnInit {
  authSrv = inject(AuthService);
  router = inject(Router);

  confirmationService: any;
  messageService: any;

  constructor(){
    this.confirmationService = inject(ConfirmationService);
    this.messageService = inject(MessageService);
  }

  formgroup = new FormBuilder().group({
    name :  new FormControl('', [Validators.required]),
    lastname : new FormControl('', [Validators.required]),
    address : new FormControl('', [Validators.required]),
    phone : new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.minLength(2),Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required]),
    checkPassword: new FormControl('', [Validators.required]),
  },  { validator: this.match('password','checkPassword') }
  );

  ngOnInit(): void {
  console.log('hey', this.formgroup.get('name')?.touched)  
  }

  
  sigIn(credentials: any): void {
    var credential = {
      name:credentials.name,
      lastName: credentials.lastname,
      phone : credentials.phone,
      address : credentials.address,
      password: credentials.password,
      email: credentials.email,
    };

    this.confirmationService.confirm({
      header: 'Esta seguro de los datos ingresados?',
      message: 'Por favor acepte, para continuar',
      accept: () => {
        this.authSrv.register(credential).subscribe({
          next: () => this.router.navigate(['/sign-in']),
          error: (err)=> console.error('Login failed', err)
        });
        this.messageService.add({ severity: 'info', summary: 'Exito', detail: 'Se ha registrado exitosamente', life: 3000 });
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ha cancelado el registro', life: 3000 });
      }
  });
    
  }

  match(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['confirmed']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmed: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  hasError(InputName: string, error?:'maxlength'|'minlength'|'required'|'email'|'confirmed'|'max'|'min'|'pattern'):boolean {
    if(error){
      return this.formgroup.get(InputName)?.hasError(error) &&
      (this.formgroup.get(InputName)?.dirty || this.formgroup.get(InputName)?.touched)?true:false
    }else{
      
      return this.formgroup.get(InputName)?.invalid &&
      (this.formgroup.get(InputName)?.dirty || this.formgroup.get(InputName)?.touched)?true:false
    }
      }


      confirm() {
        this.confirmationService.confirm({
            header: 'Esta seguro de los datos ingresados?',
            message: 'Por favor acepte, para continuar',
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Exito', detail: 'Se ha registrado exitosamente', life: 3000 });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ha cancelado el registro', life: 3000 });
            }
        });
    }
}
