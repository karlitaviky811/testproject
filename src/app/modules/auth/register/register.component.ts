import { Component, inject, OnInit } from "@angular/core";
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
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService, Message, MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";
import { MessagesModule } from "primeng/messages";
import {
  RecaptchaModule,
  ReCaptchaV3Service,
  RecaptchaFormsModule,
  RecaptchaV3Module,
} from "ng-recaptcha-2";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ConfirmDialogModule,
    ToastModule,
    MessagesModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    RecaptchaV3Module,
  ],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
})
export default class RegisterComponent implements OnInit {
  authSrv = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  messages: any | undefined;
  confirmationService: any;
  messageService: any;
  show = false;
  selected = false;
  nav = null;
  validRecaptcha = false
  constructor(private recaptchaV3Service: ReCaptchaV3Service) {
    this.confirmationService = inject(ConfirmationService);
    this.messageService = inject(MessageService);
    this.recaptchaV3Service = inject(ReCaptchaV3Service);
  }

  formgroup = new FormBuilder().group(
    {
      name: new FormControl("", [Validators.required]),
      lastname: new FormControl("", [Validators.required]),
      address: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required]),
      check: new FormControl(false, Validators.pattern("true")),
      email: new FormControl("", [
        Validators.minLength(2),
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
      checkPassword: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
    },
    { validator: this.match("password", "checkPassword") }
  );

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.nav = params["redirectTo"];
    });
    this.executeImportantAction();
    //this.addMessages()
  }

  sigIn(credentials: any): void {
    var credential = {
      name: credentials.name,
      lastName: credentials.lastname,
      phone: credentials.phone,
      address: credentials.address,
      password: credentials.password,
      email: credentials.email,
    };

    this.show = true;
    if(this.validRecaptcha){
      this.confirmationService.confirm({
        header: "Esta seguro de los datos ingresados?",
        message: "Por favor acepte, para continuar",
        accept: () => {
          this.authSrv.register(credential).subscribe({
            next: () => {
              this.router.navigate([this.nav ? 'site/'+this.nav : "/site"]);
              this.show = false;
            },
            error: (err) => {
              console.log("err", err);
              this.show = false;
              this.messages = [{ severity: "warn", summary: err.error.message }];
            },
          });
        },
        reject: () => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Ha cancelado el registro",
            life: 3000,
          });
        },
      });
    }
   
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

  confirm() {
    this.confirmationService.confirm({
      header: "Esta seguro de los datos ingresados?",
      message: "Por favor acepte, para continuar",
      accept: () => {
        this.messageService.add({
          severity: "info",
          summary: "Exito",
          detail: "Se ha registrado exitosamente",
          life: 3000,
        });
      },
      reject: () => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Ha cancelado el registro",
          life: 3000,
        });
      },
    });
  }

  addMessages() {
    this.messages = [
      { severity: "info", summary: "Dynamic Info Message" },
      { severity: "success", summary: "Dynamic Success Message" },
      { severity: "warn", summary: "Dynamic Warning Message" },
    ];
  }

  executeRecaptchaVisible(token: any) {
    console.log("el token", token);
    this.authSrv.validRecaptcha(token).subscribe({
      next: () => {
        this.validRecaptcha = true;
        this.show = false;
      },
      error: (err) => {
        this.validRecaptcha = false
        this.show = false;
        this.messages = [{ severity: "warn", summary: err.error.message }];
      },
    });
  }

  public executeImportantAction(): void {
    console.log("important Action");
    this.recaptchaV3Service
      .execute("importantAction")
      .subscribe((token: any) => {
        console.log("heeeeyyy", token);
      });
  }

  selectedTerms() {
    return !this.selected;
  }
}
