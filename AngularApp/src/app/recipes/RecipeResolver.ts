import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Datastaorageservice } from '../shared/DataStorage';
import { RecipeWebserviceService } from './recipe-webservice.service';
import { RecipeServcie } from './RecipeService';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class RecipeResolverservice implements Resolve<Recipe[]|string>{
    constructor(private datastorageservice: Datastaorageservice,
        private recipewebservice:RecipeWebserviceService,private recipeservice:RecipeServcie){}
    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<Recipe[]|string>{
        
      
        //return this.datastorageservice.FetchData();
        return this.recipewebservice.fetchData()
        //.pipe(
        //     catchError(
        //         (err:string)=>Observable.create(err) )
        //);
    }



}