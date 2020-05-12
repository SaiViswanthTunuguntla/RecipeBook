import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { take, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Authguard implements CanActivate{
    constructor(private authservice:AuthService,private router:Router){}
    canActivate(
        route: import("@angular/router").ActivatedRouteSnapshot,
         state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> 
    {
        //throw new Error("Method not implemented.");
        return this.authservice.usersub.pipe(
            take(1),
           map( user =>
            {
          const isAuth = user?true:false;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);
                
            })

        );
    }
    
}