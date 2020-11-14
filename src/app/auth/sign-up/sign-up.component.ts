import { Component, OnInit } from '@angular/core';
import { 
    FormBuilder,
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
    signUpForm: FormGroup;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.signUpForm = this.formBuilder.group({
            displayName: [null, [
                Validators.required,
                Validators.minLength(3)
            ]],
            email: [null, [
                Validators.required,
                Validators.email
            ]],
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

        console.log(this.signUpForm.value);
    }

    get displayName(): FormControl {
        return this.signUpForm.get('displayName') as FormControl;
    }

    get email(): FormControl {
        return this.signUpForm.get('email') as FormControl;
    }

    get password(): FormControl {
        return this.signUpForm.get('password') as FormControl;
    }
}
