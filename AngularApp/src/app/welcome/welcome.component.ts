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
  person:Person
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
  ongetperonsByid(){
    this.http.get<Person>('http://localhost:8080/persons',
    { headers:new HttpHeaders({Authorization: this.authString})}
    ).subscribe(
      response=>
      {
          console.log(response.description)
          // this.person.id=response.id;
          // this.person.name=response.name;
          // this.person.description=response.description;
          this.person=response;

      }
    );
}

}
export class WelcomeBean{
  message:string;
}
export class Person{

  id:number;
  name:String;
  description:String;

}
