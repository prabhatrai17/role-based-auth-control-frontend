import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { API_ENDPOINTS, RESPONSE_STATUS, baseUrl } from 'src/app/app-constants';
import { AppService } from 'src/app/shared/services/app-service/app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup = new FormGroup({});
  isSpinnerActive = false;
  isPasswordVisible = false;
  isConfirmPasswordVisible = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private appService: AppService,
    private toastrService: ToastrService,
    private route:Router) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.pattern("^[a-zA-Z][a-zA-Z\\s]{4,}$"),Validators.required]],
      password: ['', [Validators.required, this.passwordValidator]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  passwordValidator(control: any) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(control.value) ? null : { invalidPassword: true };
  }

  isPasswordValid() {
    const passwordControl = this.registrationForm.get('password');
    return passwordControl?.valid && passwordControl?.touched;
  }

  isPasswordMatch() {
    const passwordControl = this.registrationForm.get('password');
    const confirmPasswordControl = this.registrationForm.get('confirmPassword');
    return passwordControl?.value === confirmPasswordControl?.value && confirmPasswordControl?.touched && confirmPasswordControl?.value.length > 0;
  }

  onSubmit() {
    // Handle registration logic here
    if (this.registrationForm.status === 'VALID') {
      this.isSpinnerActive = true;
      const registerFormData = {
        email: this.registrationForm.value.email,
        username: this.registrationForm.value.username,
        password: this.registrationForm.value.password,
      };
      const registerUrl = baseUrl + API_ENDPOINTS.account.register;
      this.appService.post(registerUrl, registerFormData).subscribe((res: any) => {
        console.log(res);
        this.isSpinnerActive = false;
        if (res.hasOwnProperty('errorCode') && res[`errorCode`] === RESPONSE_STATUS.badRequest) {
          this.toastrService.error('User Already exists', 'Error')
        } else if (res.hasOwnProperty('statusCode')) {
          this.toastrService.success('User Added', 'Success');
          this.router.navigate(['account', 'login']);
        }
      }, (error) => {
        console.log(error);
        this.isSpinnerActive = false;
      })
    }
  }
  redirectToLogin() {
    this.router.navigate(['account', 'login']);
  }
  passwordVisiblityChanger(passwordField: String) {
    if (passwordField === 'password') {
      this.isPasswordVisible = !this.isPasswordVisible;
    } else if (passwordField === 'confirmPassword') {
      this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
    }
  }
   
  login(){
    this.route.navigateByUrl('/account/login');
  }
}
