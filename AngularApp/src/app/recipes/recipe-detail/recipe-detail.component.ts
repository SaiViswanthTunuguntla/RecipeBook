import { Component, OnInit, Input } from '@angular/core';
import { RecipeServcie } from '../RecipeService';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
   recipe111 :Recipe;
  id:number;
  constructor(private recipeservcie:RecipeServcie,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.id=this.route.snapshot.params['id'];
    //console.log(this.recipename);

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
    console.log("jnk")
    this.router.navigate(['edit'],{relativeTo:this.route})
  }
  onDeleteRecipe() {
    this.recipeservcie.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
