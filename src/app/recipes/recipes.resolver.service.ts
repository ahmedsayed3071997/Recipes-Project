import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterState, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { recipeService } from "./recipe.service";

import * as fromAppReducer from '../store/app-reducer'
import * as fromRecipesActions from '../recipes/store/recipe.actions'
import { Store } from "@ngrx/store";
import { Actions, ofType } from "@ngrx/effects";
import { map, switchMap, take } from "rxjs/operators";
import { of } from "rxjs";

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]> {
    constructor(private dataStorageService: DataStorageService, private recipeService: recipeService , private store:Store<fromAppReducer.AppState>, private actions$:Actions) { }

    // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //     const recipes = this.recipeService.getRecipes();
    //     if (recipes.length === 0) {
    //         return this.dataStorageService.fetchData();
    //     } else {
    //         return recipes
    //     }
    // }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('recipes').pipe(
            take(1),
            map(recipesState =>  recipesState.recipes ),
            switchMap((recipes :any)=> {
                if (recipes.length === 0) {
                    this.store.dispatch(new fromRecipesActions.FetchRecipes())
                    return this.actions$.pipe(ofType(fromRecipesActions.SET_RECIEPES), take(1))
                } else {
                    return of(recipes)
                }
            })
        )
      

    }
    
}