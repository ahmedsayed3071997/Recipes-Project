import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
// import { RecipesComponent } from './recipes/recipes.component';
// import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
// import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
// import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
// import { ShopingListComponent } from './shoping-list/shoping-list.component';
// import { ShoppingEditComponent } from './shoping-list/shopping-edit/shopping-edit.component';
import { DroppdownDirective } from './shared/droppdown.directive';
import { shoppingService } from './shoping-list/shopping.service';
import { AppRoutingMoudule } from './app-routing.service';
//import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
//import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { recipeService } from './recipes/recipe.service';
import { from } from 'rxjs';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinerComponent } from './loading-spiner/loading-spiner.component';
import { AuthInterceptorService } from './auth/auth.interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';
import { RercipesModule } from './recipes/recipes.modules';
import { ShopingListModule } from './shoping-list/shoppling-list.module';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    
    
    DroppdownDirective,
    
    AuthComponent,
    LoadingSpinerComponent,
    AlertComponent,
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingMoudule,
    RercipesModule,
    ShopingListModule
    
  ],
  providers: [
    shoppingService,
    recipeService, 
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
