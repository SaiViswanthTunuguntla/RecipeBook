import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RecipeServcie } from '../recipes/RecipeService';
import { Recipe } from '../recipes/recipe.model';
//import { ingredients } from 'ingredients.model';
import {map,tap} from 'rxjs/operators';
import { User } from '../auth/user.model';
@Injectable({providedIn:'root'})
export class Datastaorageservice{
    constructor(private http:HttpClient,private recipeservice:RecipeServcie){}
    // username='admin'
    // password='nimda'
    // authString='Basic '+window.btoa(this.username+':'+this.password);

    Storedata(){
    const recipes=this.recipeservice.getRecipes();  
    this.http.put('https://my-angular-demo-6dcda.firebaseio.com/recipes.json',recipes
    ).subscribe(response=>
        {
            console.log(response)
        });
}
    FetchData(){

       return  this.http.get<Recipe[]>('https://my-angular-demo-6dcda.firebaseio.com/recipes.json')
        .pipe(tap(recipes => {
            this.recipeservice.setRecipes(recipes);
          })
        )
    //  return  this.http.get<Recipe[]>('http://localhost:8080/users/viswa/recipes')
    //     .pipe(tap(recipes => {
    //         //console.log(recipes)
    //     this.recipeservice.setRecipes(recipes);
    //      })
    // )

}
//console.log(response);
            // for (const key in response){
            //     const recipe=response[key];
            //     console.log(recipe);
            //     //this.recipeservice.setRecipes(recipe);
            // }
}