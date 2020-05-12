import { ingredient } from '../shared/ingredients.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppingService{
    ingredient: ingredient[] = [
        new ingredient('Apples', 5),
        new ingredient('Tomatoes', 10),
      ];
      emitvalues=new Subject<ingredient[]>();
      edititem=new Subject<number>();
      getIngredients(){
          return this.ingredient.slice();
      }

      getIngredient(index:number){
        console.log("in shopping service");
       return this.ingredient[index];
      }

      AddIngredients(ing:ingredient[]){
        console.log(name);
        //console.log(amount)
        this.ingredient.push(...ing);
        this.emitvalues.next(this.ingredient.slice());
      }
      UpdateIngredients(index:number,ing:ingredient){
        this.ingredient[index]=ing;
        this.emitvalues.next(this.ingredient.slice());
      }
      DeleteIngredients(index:number){
        this.ingredient.splice(index,1);
        this.emitvalues.next(this.ingredient.slice());
      }

}