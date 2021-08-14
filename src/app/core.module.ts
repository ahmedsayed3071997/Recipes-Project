import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth.interceptor.service";
import { recipeService } from "./recipes/recipe.service";
import { shoppingService } from "./shoping-list/shopping.service";

@NgModule({
    providers: [
        shoppingService,
        recipeService, 
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
    ]
})
export class CoreModule { }