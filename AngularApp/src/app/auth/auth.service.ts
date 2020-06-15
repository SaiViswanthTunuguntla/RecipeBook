import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError,tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { Datastaorageservice } from '../shared/DataStorage';
import { RecipeServcie } from '../recipes/RecipeService';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
  }

@Injectable({providedIn:'root'})
export class AuthService{
    usersub = new BehaviorSubject<User>(null);
    tokenExpirationTimer: any;
    constructor(private http:HttpClient,private router:Router,private datastorage:Datastaorageservice,private recipeservice:RecipeServcie ){}

    OnSignup(ema:String,passw:String){

        return this.http
        .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyATSm_Qe_JLCQfSUpLZXeMzJi-qskEzaPs',
            {
                email:ema,
                password:passw,
                returnSecureToken:true
            }).pipe(catchError(this.handleerror),
            tap(userresp=>{
                this.handleAuthentication(
                    userresp.email,
                    userresp.localId,
                    userresp.idToken,+userresp.expiresIn)
            })
            );

    }

    OnLogin(ema:String,passw:String)
    {
        //console.log("in login method");
        return this.http
        .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyATSm_Qe_JLCQfSUpLZXeMzJi-qskEzaPs',
            {
                email:ema,
                password:passw,
                returnSecureToken:true
            }).pipe(catchError(this.handleerror),
            tap(userresp=>{
                this.handleAuthentication(
                    userresp.email,
                    userresp.localId,
                    userresp.idToken,+userresp.expiresIn)
            })
            );
            // this.datastorage.FetchData().subscribe(response =>
            //     {
            //         this.recipeservice.setRecipes(response);
            //     })

    }

    autoLogin() {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userdata'));
        
        if (!userData) {
          return;
        }
    
        const loadedUser = new User(
          userData.email,
          userData.id,
          userData._token,
          new Date(userData._tokenExpirationDate)
        );
    
        if (loadedUser.token) {
          this.usersub.next(loadedUser);
          const expirationDuration =
            new Date(userData._tokenExpirationDate).getTime() -
            new Date().getTime();
          this.autoLogout(expirationDuration);
        }
        // this.datastorage.FetchData().subscribe(response =>
        //     {
        //         this.recipeservice.setRecipes(response);
        //     })
      }

      logout() {
        this.usersub.next(null);
        localStorage.removeItem('userdata');
        this.router.navigate(['/auth']);
        
        if (this.tokenExpirationTimer) {
          clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;

      }

      autoLogout(expirationDuration: number) {
          console.log(expirationDuration)
        this.tokenExpirationTimer = setTimeout(() => {
          this.logout();
        }, expirationDuration);
      }
    

    private handleerror(errorresp:HttpErrorResponse)
    {
         console.log(errorresp);
         let errsormsg="An unknown error ocuured";
         switch (errorresp.error.error.message) {
             case "EMAIL_NOT_FOUND":
                 errsormsg=" There is no user record corresponding to this user";
                // return throwError(errsormsg);
                 break;
             case "INVALID_PASSWORD":
                 errsormsg='The password is invalid';
                 break;
             case 'EMAIL_EXISTS':
                 errsormsg = 'This email exists already';
                 break;
         }
         return throwError(errsormsg);
 
    }

    private handleAuthentication(
        email: string,
        userId: string,
        token: string,
        expiresIn: number
      ) {
            const expirationdate= new Date(new Date().getTime()+expiresIn*1000);
            const user=new User(email,userId,token,expirationdate);
            this.usersub.next(user);
            this.autoLogout(expiresIn * 1000);
            localStorage.setItem('userdata',JSON.stringify(user));

      }

}