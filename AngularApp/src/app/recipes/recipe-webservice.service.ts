import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { RecipeServcie } from './RecipeService';
import { throwError, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeWebserviceService {
  

  constructor(private http: HttpClient,private recipeservice:RecipeServcie) { }
  recipe:Recipe;
  errormsg= new Subject<String>();

  addRecipe(recipe){
    this.recipe=recipe;
    return  this.http.post<Recipe>('http://localhost:8080/users/viswa/recipes',this.recipe,
    // {responseType: 'text'}
    )
    .pipe(tap(
      response=>{
        console.log(response);
      }
    ),
      catchError(this.handleerror)
    );   
  }

  updateRecipe(id: number, recipe: Recipe) {
    this.recipe=recipe;
    //console.log(id);
    //console.log(this.recipe);
    return  this.http.put<Recipe>(`http://localhost:8080/users/viswa/recipes/${id}`,this.recipe
    )
    .pipe(tap(
      response=>{
        console.log(response);
      }
    ),
      catchError(this.handleerror)
    );
  }

  deleteRecipe(id: number) {
    return  this.http.delete(`http://localhost:8080/users/viswa/recipes/${id}`
    )
    .pipe(tap(
      response=>{
        console.log(response);
      }
    ),
      catchError(this.handleerror)
    );
  }


  fetchData(){
    return  this.http.get<Recipe[]>('http://localhost:8080/users/viswa/recipes')
    .pipe(catchError(this.handleerror)
    ,
      tap((recipes:Recipe[]) => {
               this.recipeservice.setRecipes(recipes);
              })
    );
  }

  handleerror(error: HttpErrorResponse) {
   let errormsg="Some error occured,pls try again!"
    if(error.error)
    { 
      if(error.error.details) errormsg=error.error.details[0]
      else errormsg=error.error.message;
    }
  
    return throwError(errormsg);
  }

}
export class ErrorResponse{
  public message:String
  public code:Number
  public details:String[]
  constructor(message:string,code:number,details:String[]){
    this.code=code;
    this.details=details;
    this.message=message;
  }

}
