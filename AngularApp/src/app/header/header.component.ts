import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Datastaorageservice } from '../shared/DataStorage';
import { RecipeServcie } from '../recipes/RecipeService';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  
  styleUrls: ['./header.component.css']
})
export class AppHeaderComponent implements OnInit {
  constructor(private datastorage:Datastaorageservice,private recipeservice:RecipeServcie,
    private authservice:AuthService,private router:Router){}
  
  // feature:string;
 //@Output() emitrecipe=new EventEmitter<string>();
 isAuthenticated = false;
 private userSub: Subscription;
 ngOnInit(): void {
   this.userSub=this.authservice.usersub.subscribe(user=>
    {
      this.isAuthenticated= user?true:false;
      console.log(this.isAuthenticated);
    })
    
}
onLogout(){
 this.authservice.logout();

}


  savedata(){
    this.datastorage.Storedata();
  }

  getdata(){
    this.datastorage.FetchData().subscribe(response =>
      {
          this.recipeservice.setRecipes(response);
      })
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
   // recipesclicked(feature:string){
    
  //   this.emitrecipe.emit(feature);
  // }
}

