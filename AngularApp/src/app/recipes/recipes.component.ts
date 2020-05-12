import { Component, OnInit } from '@angular/core';
import { RecipeServcie } from './RecipeService';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  //providers:[RecipeServcie]
})
export class RecipesComponent implements OnInit {
  selectedrecipe:Recipe;
  constructor(private recipeservcie:RecipeServcie) { }
  
  ngOnInit() {
   // this.recipeservcie.emitRecipeItem.emit(this.selectedrecipe);
   this.recipeservcie.emitRecipeItem.subscribe(
    (recipe:Recipe)=>{
      this.selectedrecipe=recipe;
    }
  )
  }

}
