import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { AlertMessageComponent } from './components/alert-message/alert-message.component';

@NgModule({
  declarations: [HeaderComponent, AlertMessageComponent],
  imports: [
    CommonModule,
  ]
})
export class SharedModule { }
