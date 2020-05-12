import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeServcie } from '../../RecipeService';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  
  //@Input() recipeitem:{name: string,description: string,imagePath: string};
  @Input()  recipeitem1:Recipe;
  @Input() index: number;
  //name:string="KASLDMKA";

  constructor(private recipeservcie:RecipeServcie ) { }
  ngOnInit() {
    
  }
  
  onSelected(){
    this.recipeservcie.emitRecipeItem.emit(this.recipeitem1);
  }
 
  // fn(){
  //   this.name="qwert";
  //  console.log(this.recipeitem1.imagePath);
  //    return this.recipeitem1.imagePath;
  //  }
 
  




}
