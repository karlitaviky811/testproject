import { Component, inject } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { AuthService } from "../../../core/services/auth_service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouteEventsService } from "../../../core/services/route_event_service";
import { Location } from "@angular/common";
import { MessagesModule } from "primeng/messages";

@Component({
  selector: "app-sign-in",
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MessagesModule,
  ],
  providers: [AuthService],
  templateUrl: "./sign-in.component.html",
  styleUrl: "./sign-in.component.scss",
})
export default class SignInComponent {
  authSrv = inject(AuthService);
  router = inject(Router);
  location = inject(Location);
  route =  inject(ActivatedRoute)
  show = false;
  messages: any | undefined;
  private routeEventsService = inject(RouteEventsService);
  formgroup = new FormBuilder().group({
    email: new FormControl("", [
      Validators.minLength(2),
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl("", [Validators.required]),
  });

  sigIn(credentials: any): void {
    this.show = true;
    console.log("e", this.formgroup);
    var credential = {
      password: credentials.password,
      email: credentials.email,
    };

 
    this.authSrv.login(credential).subscribe({
      next: (res) => {
        this.router.navigate(["/site"]);
        localStorage.setItem("userObject", JSON.stringify(res));
        this.show = false;
      },
      error: (err) => {

        this.show = false;
        this.messages = [{ severity: "warn", summary: err.error.message }];
      },
    });
  }

  match(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors["confirmed"]) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmed: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  hasError(
    InputName: string,
    error?:
      | "maxlength"
      | "minlength"
      | "required"
      | "email"
      | "confirmed"
      | "max"
      | "min"
      | "pattern"
  ): boolean {
    if (error) {
      return this.formgroup.get(InputName)?.hasError(error) &&
        (this.formgroup.get(InputName)?.dirty ||
          this.formgroup.get(InputName)?.touched)
        ? true
        : false;
    } else {
      return this.formgroup.get(InputName)?.invalid &&
        (this.formgroup.get(InputName)?.dirty ||
          this.formgroup.get(InputName)?.touched)
        ? true
        : false;
    }
  }

  navBack() { 
    let cur_path = this.location.path();
    this.location.back();
    if (cur_path === this.location.path())
      this.router.navigate(["/default-route"]);
  }
}
