import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    constructor() {
        firebase.initializeApp(environment.firebaseConfig);
    }
}