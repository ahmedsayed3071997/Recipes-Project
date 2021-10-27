import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Ingrediants } from 'src/app/shared/ingrediants.model';
import { Recipe } from '../recipe.model';
import { recipeService } from '../recipe.service';

import * as fromAppReducer from '../../store/app-reducer'
import * as recipesActions from '../store/recipe.actions'
import * as shoppingListActions from '../../shoping-list/store/shopping-list.actions'
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  
  
  
  constructor(private recipeService: recipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store:Store<fromAppReducer.AppState>) { }
  
  recipe: Recipe;
  id: number;
 
  ngOnInit() {
    // this.route.params
    //   .subscribe(
    //     (params: Params) => {
    //       this.id = +params['id'];
    //       // this.recipe = this.recipeService.getRecipe(this.id);
    //       this.store.select('recipes').pipe(
    //         map(recipesState => {
    //           return recipesState.recipes.find((recipe,index) => {return index===this.id })
    //         })
    //       ).subscribe(
    //         (recipe) => {
    //           this.recipe = recipe
    //          }
    //       )
    //     }
    // )

    this.route.params.pipe(
      map(params => { return +params['id'] }),
      switchMap(
        (id) => {
          this.id = id
          return this.store.select('recipes');
        }
      ),
      map(recipeState => {
        return recipeState.recipes.find((recipe, index) => { return index === this.id });
      })
    ).subscribe(recipe => { this.recipe = recipe})
  }
  
  onAddToShopingList() {
    // this.recipeService.onAddIngrediantsToShopingList(this.recipe.ingrediants)
    this.store.dispatch(new shoppingListActions.AddIngrediants(this.recipe.ingrediants));
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route})
    //this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route})
  }
  onDeleteRecipe() {
    // this.recipeService.deletRecipe(this.id);
    this.store.dispatch(new recipesActions.DeleteRecipe(this.id))
    this.router.navigate(['/recipes'])
  }
}
