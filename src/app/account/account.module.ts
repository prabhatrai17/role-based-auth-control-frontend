import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../shared/components/shared-components.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NgxOtpInputModule } from 'ngx-otp-input';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  {path:'',redirectTo:'login',pathMatch:'full'}
]

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
   
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    NgxOtpInputModule,
    ButtonModule,
    PasswordModule
    
  ]
})
export class AccountModule { }
