import { Component, OnInit } from '@angular/core';
import { 
    FormBuilder, 
    FormGroup, 
    FormControl, 
    Validators 
} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
    loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', [
              Validators.required, 
              Validators.minLength(6)
          ]]
      });
  }

  onSubmit() {
      if (this.loginForm.invalid) {
          return;
      }

      this.authService.signIn(this.username.value, this.password.value)
      .subscribe((response) => {
          console.log('onSubmit() [subscription]')
          console.log(response);
      },
      (error) => {
          console.log('onSubmit() [error]');
          console.log(error);
      });
  }

  get username(): FormControl {
      return this.loginForm.get('username') as FormControl;
  }

  get password(): FormControl {
      return this.loginForm.get('password') as FormControl;
  }

}
