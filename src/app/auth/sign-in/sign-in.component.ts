import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { AuthService, UserData } from "../auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"],
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.signIn(this.username.value, this.password.value).subscribe(
      () => {
        this.loading = false;
        this.router.navigate(["/home"]);
      },
      (error) => {
        this.loading = false;
        this.snackBar.open(error, "DISMISS", { duration: 5000 });
      }
    );
  }

  get username(): FormControl {
    return this.loginForm.get("username") as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get("password") as FormControl;
  }
}
