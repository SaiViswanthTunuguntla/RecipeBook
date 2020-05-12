import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private AuthService:AuthService,private router:Router) { }

  ngOnInit() {
  }
  isLoginMode=false;
  isLoading=false;
  email:String;
  password:String;
  error:String;

  onSwitchMode(){
    this.isLoginMode=!this.isLoginMode;
  }
  onSubmit(form:NgForm){
    this.isLoading=true;
    this.email=form.value.email;
    this.password=form.value.password;
    //console.log(this.email,this.password);
    let authObs: Observable<AuthResponseData>;
    
    if(this.isLoginMode){
      authObs=this.AuthService.OnLogin(this.email,this.password);
      setTimeout(()=>{
        this.isLoading=false;
      }, 5000);
     
      
    }else{
      authObs=this.AuthService.OnSignup(this.email,this.password);
      this.isLoading=false;
     // this.router.navigate(['/recipes'])
    }
    


    authObs.subscribe(authresp=>
      {
        console.log(authresp);
        this.router.navigate(['/recipes'])
      },(errorMsg=>
        {
          console.log(errorMsg);
          this.error=errorMsg;
        }

      )
    );

      form.reset();
  }

  handleerror(){
    this.error=null;
  }

}
