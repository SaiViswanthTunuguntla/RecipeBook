import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private authservice:AuthService){}
    username='admin'
    password='nimda'
    authString='Basic '+window.btoa(this.username+':'+this.password);

    intercept(req: HttpRequest<any>, next: HttpHandler){
        return this.authservice.usersub.pipe(
            take(1),
            exhaustMap(user=>
                {
                     if(!user){
                        return next.handle(req);
                    }
                
                      const modifiedreq=req.clone({
                        headers:new HttpHeaders({
                            'Authorization': `${this.authString}`,
                            'Content-Type': 'application/json' 
                        })
                     //params: new HttpParams().set('auth', user.token)
                      });
                      return next.handle(modifiedreq);
                })
        );

    }

    
    

}