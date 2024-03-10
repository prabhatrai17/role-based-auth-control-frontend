import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxOtpInputConfig } from 'ngx-otp-input';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  currentStep = 3;
  emailAddress: string = '';
  verificationCode: string = '';
  errorMessageVisiblity = false;
  isPasswordVisible = false;
  isConfirmPasswordVisible = false;
  credentialErrorMsg = 'Incorrect email !'
  passwordValidatorForm: FormGroup = new FormGroup({});

  constructor(private toastrService: ToastrService,
    private fb: FormBuilder) {

  }
  ngOnInit() {
    this.passwordValidatorForm = this.fb.group({
      newPassword: ['', [Validators.required, this.passwordValidator]],
      confirmPassword: ['', Validators.required]
    });
  }
  passwordValidator(control: any) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(control.value) ? null : { invalidPassword: true };
  }
  sendCode(): void {
    // Simulate sending code logic (you can implement your logic here)
    // For simplicity, just increment the step
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (regex.test(this.emailAddress)) {
      this.currentStep = 2;
    } else {
      this.toastrService.error('Enter Valid email', 'Error')
    }
  }
  verifyCode(): void {
    const input = document.getElementById('verificationCode') as HTMLInputElement;;
    if (this.verificationCode.length > 0 && !/^\d+$/.test(this.verificationCode) && this.verificationCode.length <= 5) {
      this.toastrService.error('enter Valid code', 'Error');
    }
    // Simulate verifying code logic (you can implement your logic here)
    // For simplicity, just increment the step
    else {
      this.currentStep = 3;
      this.isPasswordValid();

    }
  }
  resetPassword(): void {
    // Simulate resetting password logic (you can implement your logic here)
    // For simplicity, just display a success message
    this.currentStep = 4;
  }
  buttonClick(currentStep: number) {
    if (currentStep === 1) {
      this.sendCode();
    } else if (currentStep === 2) {
      this.verifyCode();

    } else {
      this.resetPassword();
    }

  }
  goBack() {
    this.currentStep = this.currentStep - 1;
  }
  passwordVisiblityChanger(passwordField: String) {
    if (passwordField === 'password') {
      this.isPasswordVisible = !this.isPasswordVisible;
    } else if (passwordField === 'confirmPassword') {
      this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
    }
  }
  isPasswordValid() {
    const passwordControl = this.passwordValidatorForm.get('newPassword');
    return passwordControl?.valid && passwordControl?.touched;
  }
  isPasswordMatch() {
    const passwordControl = this.passwordValidatorForm.get('newPassword');
    const confirmPasswordControl = this.passwordValidatorForm.get('confirmPassword');
    return passwordControl?.value === confirmPasswordControl?.value && confirmPasswordControl?.touched && confirmPasswordControl?.value.length > 0;
  }
  onStep3() {
    // Trigger visibility change for the icons when moving to step 3
    this.passwordVisiblityChanger('password');
    this.passwordVisiblityChanger('confirmPassword');
  }
  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 6,
    autofocus: true,
    classList: {
      inputBox: "my-super-box-class",
      input: "my-super-class",
      inputFilled: "my-super-filled-class",
      inputDisabled: "my-super-disable-class",
      inputSuccess: "my-super-success-class",
      inputError: "my-super-error-class"
    }
  };
  handeOtpChange(value: string[]): void {
    console.log(value)
    this.verificationCode = value.join('');
  }

  handleFillEvent(value: string): void {
    console.log(value);
  }
}
