import { Injectable } from '@angular/core';
import { User } from './../interface/user';
import { SqlService } from './sql.service';
import { SqlResponse } from './../interface/sql-response';
import { SqlRequest } from '../interface/sql-request';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User = {id: 0, title: 'Anonymous', authLevel: 0};
  private users: Array<User> = [];
  private failedLoginCount  = 0;

  constructor(private sql: SqlService, private router: Router ) {
    this.sql.select('users', {
      columns: ['id', 'title', 'authLevel']
    }).subscribe((response: Array<User>) => {
      this.users = response;
    });
  }

  get failedLogin(): number {
    return this.failedLoginCount;
  }

  resetFailedLogin(): void {
    this.failedLoginCount = 0;
  }

  /**
   * Checks if User exist in Database
   * @param username
   * @param thePassword
   */
  tryToLogin(username: string, thePassword: string) {
    const request: SqlRequest = {
      columns: ['id', 'title', 'authLevel'],
      andWhere: {
        title: username,
        password: thePassword
      }
    };
    this.sql.select('users', request, true)
    .subscribe((response: SqlResponse) => {
      console.log(response);
      if (response.rows.length >= 1) {
        this.currentUser = response.rows[0];
        this.navigateToHome();
      } else {
        this.failedLoginCount += 1;
      }
    });
  }

  logOut() {
    this.currentUser = {id: 0, title: 'Anonymous', authLevel: 0};
  }

  private navigateToHome() {
    this.router.navigateByUrl('home-page');
  }

  /**
   * Return Boolean, Checks if User has necessary Access Level
   * @param requiredLevel Access Level Requested
   */
  isAuth(requiredAccessLevel?: number): boolean {
    if ( requiredAccessLevel === undefined ) {
      requiredAccessLevel = 1;
    }
    return this.activeUser.authLevel >= requiredAccessLevel;
  }

  /**
   * Returns Currently Logged In User;
   */
  get activeUser(): User {
    return this.currentUser;
  }

  get allUsers(): Array<User> {
    return this.users;
  }

  getUserById(userId: number): User {
    const user = this.users.find( x => x.id === userId );
    if ( user === undefined ) {
      return user;
    } else {
      return {id: 0, title: 'Anonymous', authLevel: 0};
    }
  }
}
