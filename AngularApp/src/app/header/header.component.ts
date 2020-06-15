import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Datastaorageservice } from '../shared/DataStorage';
import { RecipeServcie } from '../recipes/RecipeService';
import { Subscription, VirtualTimeScheduler } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { RecipeWebserviceService } from '../recipes/recipe-webservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  
  styleUrls: ['./header.component.css']
})
export class AppHeaderComponent implements OnInit {
  error: any;
  constructor(private datastorage:Datastaorageservice,private recipeservice:RecipeServcie,
    private authservice:AuthService,private router:Router,private recipewebservice:RecipeWebserviceService){}
  
  // feature:string;
 //@Output() emitrecipe=new EventEmitter<string>();
 isAuthenticated = false;
 private userSub: Subscription;
 ngOnInit(): void {
   this.userSub=this.authservice.usersub.subscribe(user=>
    {
      this.isAuthenticated= user?true:false;
     // console.log(this.isAuthenticated);
    })
    
}
onLogout(){
 this.authservice.logout();

}


  savedata(){
    this.datastorage.Storedata();
  }

  getdata(){
    // this.datastorage.FetchData().subscribe(response =>
    //   {
    //       this.recipeservice.setRecipes(response);
    //   })
      this.recipewebservice.fetchData().subscribe(response =>
        {
            this.recipeservice.setRecipes(response);
        }),(
          (errormsg:String)=>{
            this.error=errormsg;
            console.log(this.error);
            this.recipewebservice.errormsg.next(errormsg);
          }
        )
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
   // recipesclicked(feature:string){
    
  //   this.emitrecipe.emit(feature);
  // }
}

