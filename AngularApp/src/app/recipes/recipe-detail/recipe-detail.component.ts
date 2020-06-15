import { Component, OnInit, Input } from '@angular/core';
import { RecipeServcie } from '../RecipeService';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RecipeWebserviceService } from '../recipe-webservice.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
   recipe111 :Recipe;
  id:number;
  errormsg: String;
  constructor(private recipeservcie:RecipeServcie,private recipewebservice:RecipeWebserviceService,
    private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.id=this.route.snapshot.params['id'];
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=this.route.snapshot.params['id'];
       this.recipe111= this.recipeservcie.getRecipe(this.id);
      }
    )
    
  }
  onAddToShoppingList() {
    console.log(this.recipe111);
    this.recipeservcie.addIngredientsToShoppingList(this.recipe111.ingredients);
  }

  onedit(){
    this.router.navigate(['edit'],{relativeTo:this.route})
  }
  onDeleteRecipe() {
    this.recipewebservice.deleteRecipe(this.id).subscribe(
      response=>{
        console.log(response);
         this.recipeservcie.deleteRecipe(this.id);
       },
     (error:any)=>{
       console.log("in error block in ts")
       console.log(error);
       this.errormsg=error;
       this.recipewebservice.errormsg.next(this.errormsg);
     }
    )
   
    this.router.navigate(['/recipes']);
  }
}
