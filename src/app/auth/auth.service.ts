import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { FirebaseService } from '../shared/firebase.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: BehaviorSubject<firebase.User> = new BehaviorSubject(null);

  constructor(private firebaseService: FirebaseService) { }

  async signIn(email: string, password: string) {
    this.firebaseService.auth.signInWithEmailAndPassword(email, password)
    .catch((error: firebase.auth.Error) => {
      throw error;
    })
    .then((userCredentials) => this.handleAuthentication(userCredentials))
  }

  handleAuthentication(userCredentials: firebase.auth.UserCredential) {

  }
}

interface UserData {
  uid: string;
  email: string;
  displayName: string;
  token: string;
  expirationTime: number;
}
