import { Component, OnInit } from '@angular/core';
import { 
    FormBuilder, 
    FormGroup, 
    FormControl, 
    Validators 
} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
    loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
          email: ['', [
              Validators.required, 
              Validators.email
          ]],
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

      console.log(this.loginForm.value);
  }

  get email(): FormControl {
      return this.loginForm.get('email') as FormControl;
  }

  get password(): FormControl {
      return this.loginForm.get('password') as FormControl;
  }

}