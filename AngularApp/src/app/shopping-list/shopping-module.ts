import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { appRoutingModule } from '../app-routingmodule';
import { shoppingListRoutingModule } from './shopping-routingmodule';

@NgModule({
    declarations:[
    ShoppingListComponent,
    ShoppingEditComponent,
    ],
    imports:[
        FormsModule,
        CommonModule,
        shoppingListRoutingModule
    ],
    exports:[
    ShoppingListComponent,
    ShoppingEditComponent,
    ]
})
export class shoppingListModule{

}