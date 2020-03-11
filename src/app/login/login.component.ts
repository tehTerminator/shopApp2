import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  invalidCredentials = false;
  disableSubmit = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Logout when The Page Loads
    this.authService.logOut();
  }

  get usernameField() {
    return this.loginForm.get('username');
  }

  get passwordField() {
    return this.loginForm.get('password');
  }

  onLogin() {
    this.disableSubmit = true; // Disable the Submit Button
    const failedLoginCount = this.authService.failedLogin; // Saves previous Login Failed Count
    this.authService.tryToLogin( this.usernameField.value, this.passwordField.value ); // Tries to Login
    setTimeout(() => {
      // Checks if Login Has Failed.
      if ( this.authService.failedLogin > failedLoginCount ) {
        this.invalidCredentials = true;
        this.disableSubmit = false;
      }
    }, 2000);
  }

  onReset = () => this.loginForm.reset();

}
