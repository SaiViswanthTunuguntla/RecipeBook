import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeServcie } from '../RecipeService';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeWebserviceService } from '../recipe-webservice.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];
  // = [
  //   new Recipe('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'),
  //   new Recipe('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg')
  // ];
  recipesubscription: Subscription;
  errorsubscription: Subscription;
  error:boolean
  errormsg:String
  constructor(private recipeservcie:RecipeServcie,
    private route:ActivatedRoute,private router:Router
    ,private recipewebservice:RecipeWebserviceService ) { }

  ngOnInit() {
    this.recipesubscription = this.recipeservcie.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
    this.recipes=this.recipeservcie.getRecipes();

    // const respone:Recipe[]|string=this.route.snapshot.data["recipelist"]
    // if(!Array.isArray(respone))   {
    //   this.errormsg=respone;
    //   this.error=true;
    // }
    
    this.errorsubscription=this.recipewebservice.errormsg.subscribe(
      error=>{
        this.errormsg=error;
        console.log("error came to recipelistcomponent ",this.errormsg)
        this.error=true;
      }
    )


  }
  onHandlerror(){
    this.error=false;
    this.errormsg=null;
  }
  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
  ngOnDestroy() {
    this.recipesubscription.unsubscribe();
    //this.errorsubscription.unsubscribe();
  }

}
