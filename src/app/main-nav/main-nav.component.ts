import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { CalculatorComponent } from '../calculator/calculator.component';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  navBarCollapsed = true;
  constructor(private dialog: MatDialog, private authService: AuthService) { }

  ngOnInit(): void {
  }

  openCalculator() {
    const dialogRef = this.dialog.open(CalculatorComponent);
  }

  signOut() {
    this.authService.signOut();
  }

  get isAuthenticated():boolean {
    return this.authService.authenticated;
  }

}
