import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { User } from './user.model';

export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): Observable<boolean> {
        return this.authService.user.pipe(
            take(1), 
            map((user: User) => {
            if (!!user) {
                return true;
            } else {
                this.router.createUrlTree(['/auth', 'sign-in']);
                return false;
            }
        }));
    }
}