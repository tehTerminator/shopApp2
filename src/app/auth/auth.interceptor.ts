import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { User } from './user.model';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = null;
        
        this.authService.user.pipe(take(1))
        .subscribe((user: User) => {
            token = !!user ? user.token : null;
        });

        const newRequest = req.clone({
            url: environment.baseUrl + req.url,
        });

        if (!!token) {
            newRequest.headers.set('Authorization', token);
        }

        return next.handle(newRequest);
    }
}