import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  username='admin'
  password='nimda'
  message:string
  constructor(private http:HttpClient) { }

  ngOnInit() {
  }
  //authString= 'Basic YWRtaW46bmltZGE=';
  authString='Basic '+window.btoa(this.username+':'+this.password);
  
  onSubmit(){
      this.http.get<WelcomeBean>('http://localhost:8080/welcome',
      { headers:new HttpHeaders({Authorization: this.authString})}
      ).subscribe(
        response=>
        {
            this.message=response.message;
        }
      );

  }

}
export class WelcomeBean{
  message:string;
}
