import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingService } from '../shoppingService';
import { Form, NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  //@ViewChild('nameinput',{static:false}) nameinputref:ElementRef;
  //@ViewChild('amountinput',{static:false}) amountinputref:ElementRef;
 //@Output() emitvalues=new EventEmitter<ingredients>();
 //@Output() emitvalues2=new EventEmitter<{name:string,amount:number}>();
 @ViewChild('f',{static:false}) formlocalref:NgForm;
  constructor(private shoppingservice:ShoppingService) { }
  editindex:number;
  editmode:boolean=false;
  ngOnInit() {
    this.shoppingservice.edititem.subscribe(
      (index:number)=>{
       const ing =this.shoppingservice.getIngredient(index);
       this.editmode=true;
       this.editindex=index;
       this.formlocalref.form.setValue({
         name:ing.name,
         amount:ing.amount
       })
      }
    );

  }
  onadd(){
     //const ingname=this.nameinputref.nativeElement.value;
     //const ingamount=this.amountinputref.nativeElement.value;
    if(this.editmode){
      this.shoppingservice.UpdateIngredients(this.editindex,new ingredient(this.formlocalref.value.name,this.formlocalref.value.amount));
      this.onClear();
    }
     else{
       this.shoppingservice.AddIngredients([new ingredient(this.formlocalref.value.name,this.formlocalref.value.amount)]);
       this.onClear();
    }
    // this.emitvalues.emit(new ingredients(ingname,ingamount));
    //console.log(this.nameinputref.nativeElement.value);
    //console.log(this.amountinputref.nativeElement.value);
  }
  onDelete(){
    this.shoppingservice.DeleteIngredients(this.editindex);
    this.onClear();
  }
  onClear(){
    this.formlocalref.reset();
    this.editmode=false;
  }

}
