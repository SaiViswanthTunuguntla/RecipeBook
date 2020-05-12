import { Component, OnInit } from '@angular/core';
import { AuthInterceptorService } from './auth/auth.interceptor';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private authser:AuthService){  }
  ngOnInit(): void {
    this.authser.autoLogin();
    // throw new Error("Method not implemented.");
  }
  title = 'AngularApp';
  feature:string;

  // OnNavigate(event:any){
  //   this.feature=event;
  // }
}
