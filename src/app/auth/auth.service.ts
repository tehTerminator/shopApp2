import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: BehaviorSubject<User> = new BehaviorSubject(null);
  constructor(private http: HttpClient) { }

  signIn(username: string, password: string) {
    return this.http.post('http://localhost:80/api-m/public/auth/login', {username, password})
    .pipe(
      tap((response: ServerResponse) => {
        this.handleAuthentication(response.userData);
      }),
      catchError(error => {
        throw error.error.message;
      })
    );
  }

  signUp(displayName: string, username: string, password: string) {
    return this.http.post('http://localhost:80/api-m/public/auth/sign-up', {
      displayName, username, password
    })
  }

  private handleAuthentication(userData: UserData) {
    const expirationDate = (new Date(userData.updated_at)).getTime() + HOUR;
    const user = new User(
      userData.id, 
      userData.username, 
      userData.displaName, 
      userData.token, 
      expirationDate);
    this.user.next(user);
  }
}

interface UserData {
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