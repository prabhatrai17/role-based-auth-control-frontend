import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-validator',
  templateUrl: './password-validator.component.html',
  styleUrls: ['./password-validator.component.css']
})
export class PasswordValidatorComponent implements OnInit {

  @Input() actionButtonLabel = '';
  @Input() otherButtonLabel = '';
  @Input() otherCredentailsValid = false;
  @Output() otherButtonLabelEmitter = new EventEmitter<any>();
  @Output() actionButtonLabelEmitter = new EventEmitter<any>();

  isPasswordVisible = false;
  isConfirmPasswordVisible = false;
  passwordValidatorForm: FormGroup = new FormGroup({});
  isSpinnerActive = false;
  constructor(private fb: FormBuilder) {
  }
  ngOnInit() {
    this.passwordValidatorForm = this.fb.group({
      password: ['', [Validators.required, this.passwordValidator]],
      confirmPassword: ['', Validators.required]
    })
  }
  passwordValidator(control: any) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(control.value) ? null : { invalidPassword: true };
  }
  isPasswordValid() {
    const passwordControl = this.passwordValidatorForm.get('password');
    return passwordControl?.valid && passwordControl?.touched;
  }

  isPasswordMatch() {
    const passwordControl = this.passwordValidatorForm.get('password');
    const confirmPasswordControl = this.passwordValidatorForm.get('confirmPassword');
    return passwordControl?.value === confirmPasswordControl?.value && confirmPasswordControl?.touched && confirmPasswordControl?.value.length > 0;
  }
  passwordVisiblityChanger(passwordField: String) {
    if (passwordField === 'password') {
      this.isPasswordVisible = !this.isPasswordVisible;
    } else if (passwordField === 'confirmPassword') {
      this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
    }
  }
  emitOtherButton() {
    this.otherButtonLabelEmitter.emit(this.otherButtonLabel);
    
  }
  actionButtonEmitValue() {
    
  }
}
