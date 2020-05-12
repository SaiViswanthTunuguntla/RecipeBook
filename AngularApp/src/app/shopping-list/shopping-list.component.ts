import { Component, OnInit, OnDestroy } from '@angular/core';

import { ingredient } from '../shared/ingredients.model';
import { ShoppingService } from './shoppingService';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  //providers:[ShoppingService]
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredient: ingredient[];
   ingsubjectsub=new Subscription();
   
  // AddIngredients(ing){
  //   console.log(name);
  //   //console.log(amount);

  //   this.ingredient.push(ing);
  // }

  constructor(private shoppingservice: ShoppingService) {}

  ngOnInit() {
    this.ingredient=this.shoppingservice.getIngredients();
    //ingredients are being consumed by below code from service class where they are emitting the ingredients.
    
    this.ingsubjectsub=this.shoppingservice.emitvalues.subscribe(
      (ingredient:ingredient[])=>
      {
        this.ingredient=ingredient;
      }
    )
    //this.ingredient=this.shoppingservice.ingredient;
  }
  onedititem(index:number){
    this.shoppingservice.edititem.next(index);
  }

  ngOnDestroy(){
    this.ingsubjectsub.unsubscribe();
  }

  }


