import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Datastaorageservice } from '../shared/DataStorage';

@Injectable({providedIn:'root'})
export class RecipeResolverservice implements Resolve<Recipe[]>{
    constructor(private datastorageservice: Datastaorageservice){}
    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
        
       
        return this.datastorageservice.FetchData();

    }



}