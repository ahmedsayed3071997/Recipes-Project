import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { Recipe } from "../recipe.model";

import * as fromRecipesActions from '../store/recipe.actions'
import * as fromAppReducer from '../../store/app-reducer'

@Injectable()
export class RecipesEffects {
    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(fromRecipesActions.FETCH_RECIPES),
        switchMap(() => {
            return this.http.get<Recipe[]>("https://recipe-project-19e9f-default-rtdb.firebaseio.com/recipes.json")
        }),
        map(
            (recipes) => {
                return recipes.map(
                    (recipe) => {
                        return {
                            ...recipe,
                            ingrediants: recipe.ingrediants ? recipe.ingrediants : []
                        };
                    }
                );
            }
        ),
        map(
            (recipes) => { return new fromRecipesActions.SetRecipes(recipes) }
        )
    )

    @Effect({dispatch:false})
    saveRecipes = this.actions$.pipe(
        ofType(fromRecipesActions.STORE_RECIPE),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipesState]) => {
            // console.log(recipesState.recipes);
            // console.log(actionData);
            return this.http.put<any>("https://recipe-project-19e9f-default-rtdb.firebaseio.com/recipes.json", recipesState.recipes)
        })
    )    

    constructor(private actions$:Actions,private http:HttpClient,private store:Store<fromAppReducer.AppState>) { }
}