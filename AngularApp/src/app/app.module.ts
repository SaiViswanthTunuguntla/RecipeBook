import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import {Routes, ROUTES, RouterModule} from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; 
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { DropdownDirectiveDirective } from './shared/dropdown-directive.directive';
import { ShoppingService } from './shopping-list/shoppingService';
import { appRoutingModule } from './app-routingmodule';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeServcie } from './recipes/RecipeService';
import { AuthComponent } from './auth/auth.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { AuthInterceptorService } from './auth/auth.interceptor';
import { AlertComponent } from './shared/alert/alert.component';
//import { shoppingListModule } from './shopping-list/shopping-module';
// const approutes: Routes=[
//   {path:'',component:AppHeaderComponent,pathMatch:'full'},
//   {path:'recipes',component:RecipesComponent},
//   // ,children:[
//   //   {path:':id/:name',component:UserComponent}
//   // ]},
//   {path:'shoppinglist',component:ShoppingListComponent},
//   // children:[
//   //   {path:':id',component:ServerComponent},
//   //   {path:':id/edit',component:EditServerComponent}
//   // ]},
//   // {path:'not-found',component:NotFoundComponent},
//   // {path:'**',redirectTo:'/not-found'}
// ]
@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    DropdownDirectiveDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    AuthComponent,
    SpinnerComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRoutingModule,
    //shoppingListModule
    // ,RouterModule.forRoot(approutes)
  ],
  providers: [ShoppingService, RecipeServcie,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
