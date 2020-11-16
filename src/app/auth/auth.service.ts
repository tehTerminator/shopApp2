import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor() { }

  async signIn(email: string, password: string) {

  }

  private handleAuthentication() {
    
  }
}

interface UserData {
  uid: string;
  email: string;
  displayName: string;
  token: string;
  expirationTime: number;
}
