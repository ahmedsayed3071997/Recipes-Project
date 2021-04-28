import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
// import { AuthGuard } from "./auth/auth.guard";
// import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
// import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
// import { RecipeItemComponent } from "./recipes/recipe-list/recipe-item/recipe-item.component";

// import { RecipeListComponent } from "./recipes/recipe-list/recipe-list.component";
// import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
// import { RecipesComponent } from "./recipes/recipes.component";
// import { RecipeResolverService } from "./recipes/recipes.resolver.service";
// import { ShopingListComponent } from "./shoping-list/shoping-list.component";
// import { ShoppingEditComponent } from "./shoping-list/shopping-edit/shopping-edit.component";



    
const appRoutes: Routes = [
    {path: '', redirectTo: '/recipes', pathMatch: 'full'},
    //{
        // path: 'shopping-list', component: ShopingListComponent
        //, children: [
          //  { path: 'shopping-edit', component: ShoppingEditComponent}
       // ]
    //},
    {path: "auth", component: AuthComponent}
    
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingMoudule { }