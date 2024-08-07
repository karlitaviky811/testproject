import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth_service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule,
    CommonModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export default class RegisterComponent {
  authSrv = inject(AuthService);
  router = inject(Router);

  formgroup = new FormBuilder().group({
    name :  new FormControl('', [Validators.required]),
    lastname : new FormControl('', [Validators.required]),
    address : new FormControl('', [Validators.required]),
    phone : new FormControl('', [Validators.required]),
    email: new FormControl('initial value here', [Validators.minLength(2),Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required]),
    checkPassword: new FormControl('', [Validators.required]),
  },  { validator: this.match('password','checkPassword') }
  );
  
  sigIn(credentials: any): void {
    console.log('e', this.formgroup)
    var credential = {
      name:credentials.name,
      lastname: credentials.lastname,
      phone : credentials.phone,
      address : credentials.address,
      password: credentials.password,
      email: credentials.email,
    };
    this.authSrv.register(credential).subscribe({
      next: () => this.router.navigate(['/admin']),
      error: (err)=> console.error('Login failed', err)
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
}
