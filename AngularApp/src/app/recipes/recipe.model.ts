import { ingredient } from '../shared/ingredients.model';

export class Recipe{
      public id:number;
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients:ingredient[];
    constructor(name: string,description: string,imagePath: string,ingredient:ingredient[] ){
        this.name=name;
        this.description=description;
        this.imagePath=imagePath;
        this.ingredients=ingredient;
    }

}