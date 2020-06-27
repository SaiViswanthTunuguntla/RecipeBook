import { ingredient } from '../shared/ingredients.model';

export class Recipe{
      public id:number;
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients:ingredient[];
    constructor(id:number,name: string,description: string,imagePath: string,ingredient:ingredient[] ){
        this.id=id;
        this.name=name;
        this.description=description;
        this.imagePath=imagePath;
        this.ingredients=ingredient;
    }

}