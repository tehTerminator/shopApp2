import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    private _app: firebase.app.App;
    private _auth: firebase.auth.Auth;

    constructor() {
        this._app = firebase.initializeApp(environment.firebaseConfig);
        this._auth = firebase.auth(this.app);
    }

    get app() {
        return this._app;
    }

    get auth() {
        return this._auth;
    }
}