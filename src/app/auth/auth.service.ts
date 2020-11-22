import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  user: BehaviorSubject<User> = new BehaviorSubject(null);
  private timeout = null;

  constructor(private http: HttpClient, private router: Router) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData !== null) {
      this.handleAuthentication(userData);
    }
  }

  signIn(username: string, password: string) {
    return this.http.post('/auth/login', {username, password})
    .pipe(
      tap((response: ServerResponse) => {
        this.handleAuthentication(response.userData);
      }),
      map((response: ServerResponse) => response.userData),
      catchError(error => {
        throw error.error.message;
      })
    );
  }

  signUp(displayName: string, username: string, password: string) {
    return this.http.post('/auth/sign-up', {
      displayName, username, password
    })
  }

  signOut() {
    this.user.next(null);
    clearTimeout(this.timeout);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth', 'sign-in']);
  }

  private handleAuthentication(userData: UserData) {
    const expirationTime = (new Date(userData.updated_at)).getTime() + HOUR;
    const currentTime = (new Date()).getTime();

    if (currentTime > expirationTime) {
      return;
    }

    localStorage.setItem('userData', JSON.stringify(userData));

    const user = new User(
      userData.id, 
      userData.username, 
      userData.displaName, 
      userData.token, 
      expirationTime);
    this.user.next(user);

    this.timeout = setTimeout(() => this.signOut(), expirationTime - currentTime );
  }

  ngOnDestroy() {
    clearTimeout(this.timeout);
  }
}

export interface UserData {
  displaName: string;
  id: number;
  token: string;
  updated_at: string;
  username: string;
}

export interface ServerResponse {
  status: string;
  userData?: UserData;
}

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;