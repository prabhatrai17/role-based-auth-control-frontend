import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { API_ENDPOINTS, RESPONSE_STATUS, baseUrl, roles } from 'src/app/app-constants';
import { AppService } from 'src/app/shared/services/app-service/app.service';
import { ToastrService } from 'ngx-toastr';

import { CommonService } from 'src/app/shared/services/common-service/common.service';
import { LoaderService } from 'src/app/shared/services/loader-service/loader.service';
import { AuthGuardService } from 'src/app/shared/services/AuthGuard/auth-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isSpinnerActive = false;
  loginForm: FormGroup = new FormGroup({});
  passwordVisiblity = false;
  errorMessageVisiblity = false;
  credentialErrorMsg = 'Incorrect email or password'
  constructor(private fb: FormBuilder,
    private appService: AppService,
    private router: Router,
    private toastrService: ToastrService,

    private commonService: CommonService,
    private authService: AuthGuardService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
console.log(this.loginForm)
  }
  preventPaste(event: any) {
    event.preventDefault();
  }
  passwordVisiblityChanger() {
    //  this.passwordVisiblity = !this.passwordVisiblity;
    if (this.passwordVisiblity) {
      this.passwordVisiblity = false;
    } else if (!this.passwordVisiblity) {
      this.passwordVisiblity = true;
    }
  }
  hidePasswordMethod() {
    this.passwordVisiblity = true;
  }
  submit() {
    if (this.loginForm.status === 'VALID') {console.log(this.loginForm);
      this.isSpinnerActive = true;
      const loginUrl = baseUrl + API_ENDPOINTS.account.login;
      this.appService.login(loginUrl, this.loginForm.value).subscribe((res: any) => {
        this.isSpinnerActive = false;
        if (res.hasOwnProperty('errorCode') && res[`errorCode`] === RESPONSE_STATUS.badRequest) {
          this.toastrService.error(res[`errorMsg`], 'Error')
        } else {
          this.authService.setLoginCredentials(res.data);


          this.toastrService.success(`Welcome ${res.data.username}`, 'Logged in')
          if (res.data.authorities.includes("ROLE_ADMIN")) {

            this.commonService.setCurrentUserAdminFlag(true);
            this.router.navigateByUrl('/admin');
          } else {
            console.log("entered else");
            this.commonService.setCurrentUserAdminFlag(false);
            this.router.navigateByUrl('/user/application/list');

           // this.router.navigate(['user', 'application', 'list']);


          }
        }
      }, (error) => {
        this.isSpinnerActive = false;
        this.toastrService.error(error.errorMsg, 'Error')

      });
    } else {console.log(this.loginForm);
    
      this.toastrService.error('Enter Credentials', 'Error')
    }
  }
  redirectToRegister() {
    this.router.navigate(['account', 'register']);
  }
  redirectToPasswordReset() {
    this.router.navigate(['account', 'reset-password']);
  }
}
