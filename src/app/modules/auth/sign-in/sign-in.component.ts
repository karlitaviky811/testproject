import { Component, inject } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../../../core/services/auth_service";
import {  FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { RouteEventsService } from "../../../core/services/route_event_service";
import { Location } from '@angular/common';

@Component({
  selector: "app-sign-in",
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule,
    CommonModule ],
  providers: [AuthService],
  templateUrl: "./sign-in.component.html",
  styleUrl: "./sign-in.component.scss",
})
export default class SignInComponent {
  authSrv = inject(AuthService);
  router = inject(Router);
  location = inject(Location)
  private routeEventsService = inject(RouteEventsService)
  formgroup = new FormBuilder().group({
    email: new FormControl('', [Validators.minLength(2),Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required])}
  );
  
  sigIn(credentials: any): void {
    console.log('e', this.formgroup)
    var credential = {
      password: credentials.password,
      email: credentials.email,
    };
    this.authSrv.login(credential).subscribe({
      next: () => this.navBack(),
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

      navBack() {
        let cur_path = this.location.path();
        this.location.back();
        if (cur_path === this.location.path())
         this.router.navigate(['/default-route']);    
      }
}
