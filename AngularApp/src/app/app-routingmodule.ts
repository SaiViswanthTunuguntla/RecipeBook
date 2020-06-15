import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppHeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeResolverservice } from './recipes/RecipeResolver';
import { AuthComponent } from './auth/auth.component';
import { Authguard } from './auth/auth.guard';
import { WelcomeComponent } from './welcome/welcome.component';

const approutes: Routes=[
    {path:'',redirectTo:'/recipes', pathMatch:'full'},
    {path:'welcome', component: WelcomeComponent },
    {path:'recipes',component:RecipesComponent,
    canActivate:[Authguard],    
    //resolve:[{recipelist:RecipeResolverservice}],
    resolve:[RecipeResolverservice],
    children:[
        {path:'',component:RecipeStartComponent},
        { path: 'new', component: RecipeEditComponent },
        {path:'edit',component:RecipeEditComponent},
        {path:':id',component:RecipeDetailComponent},
        {path:':id/edit',component:RecipeEditComponent}
       
    ]},
    { path: 'auth', component: AuthComponent },
    
    {path:'shoppinglist',loadChildren:()=>import('./shopping-list/shopping-module').then(m=>m.shoppingListModule)}
]
@NgModule({
    imports:[RouterModule.forRoot(approutes)],
    exports:[RouterModule]
})
export class appRoutingModule{

}