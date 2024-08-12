import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../../core/services/users_service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, ButtonComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export default class ProfileComponent implements OnInit {

  formBuilder = inject(FormBuilder);
  userInformationForm: FormGroup;
  user = inject(UsersService)

  constructor() {
    this.userInformationForm = this.formBuilder.group({
      name: [''],
      lastName: [''],
      email: [''],
      phone: [''],
      address: [''],
      password: ['']
    });
    this.user.getData().subscribe(res=>{
      this.userInformationForm.patchValue(res)
      this.user.updateLoginUser(res.name)
    })
  }
  
  ngOnInit(): void {
  }

  updatePassword(){
    this.user.updatePassword({id: this.userInformationForm.get('password')?.value})
  }

}
