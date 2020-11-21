import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { User } from './user.model';

export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.authService.user.pipe(take(1))
        .subscribe((user: User) => {
            const token = user.token;

            const newRequest = req.clone({
                url: environment.baseUrl + req.url,
                setHeaders: {'Authorization': token}
            });

            return next.handle(newRequest);
        });
    }
}