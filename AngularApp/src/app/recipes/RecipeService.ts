import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import {ShoppingService} from '../shopping-list/shoppingService';
import { ingredient } from '../shared/ingredients.model';
@Injectable()
export class RecipeServcie{
  constructor(private shoppingservice: ShoppingService){}
  recipesChanged = new Subject<Recipe[]>();
    recipes: Recipe[] = [
        // new Recipe('BBQ Chicken', 'Spicy and delicious',
        //  'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
        //  [
        //      new ingredients("chickenpatty",1),
        //      new ingredients("bun",1)
        //  ]),
        // new Recipe('Cheese Burger', 'Loaded with cheese and french fries', 
        // 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
        // [
        //     new ingredients("beefpatty",1),
        //     new ingredients("bun",1)
        // ]
        // )
      ];
      //emitRecipes= new EventEmitter<Recipe[]>();
      emitRecipeItem= new EventEmitter<Recipe>();

      
    setRecipes(recipes:Recipe[])
    {
        // for (let re of recipes){
        //   this.recipes.push(re);
        // }
        this.recipes=recipes;
       // console.log("in recipes service:",this.recipes);
        this.recipesChanged.next(this.recipes.slice());
      }
    getRecipes(){
      return this.recipes.slice();   
    }
    getRecipe(index: number) {
      return this.recipes[index];
    }
    addrecipes(){
        //this.emitRecipes.emit(recipes);
    }
    addRecipe(recipe: Recipe) {
      console.log(recipe);
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
    }
  
    updateRecipe(index: number, newRecipe: Recipe) {
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());
    }
  
    deleteRecipe(index: number) {
      this.recipes.splice(index, 1);
      //console.log(this.recipes);
      this.recipesChanged.next(this.recipes.slice());
    }
    addIngredientsToShoppingList(ing:ingredient[]){
      this.shoppingservice.AddIngredients(ing);
    }
}