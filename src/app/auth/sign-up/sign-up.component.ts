import { Component, OnInit } from '@angular/core';
import { 
    FormBuilder,
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
    signUpForm: FormGroup;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private authService: AuthService) { }

    ngOnInit(): void {
        this.signUpForm = this.formBuilder.group({
            displayName: [null, [
                Validators.required,
                Validators.minLength(3)
            ]],
            username: [null, Validators.required],
            password: [null, [
                Validators.required,
                Validators.minLength(6)
            ]]
        });
    }

    onSubmit() {
        if (this.signUpForm.invalid) {
            return;
        }

        this.authService.signUp(
            this.displayName.value,
            this.username.value,
            this.password.value)
        .subscribe(() => this.router.navigate(['/auth', 'sign-in']));
    }

    get displayName(): FormControl {
        return this.signUpForm.get('displayName') as FormControl;
    }

    get username(): FormControl {
        return this.signUpForm.get('username') as FormControl;
    }

    get password(): FormControl {
        return this.signUpForm.get('password') as FormControl;
    }
}
