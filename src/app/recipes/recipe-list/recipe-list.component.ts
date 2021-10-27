import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { recipeService } from '../recipe.service';
import * as fromAppReducer from '../../store/app-reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

//@Output()recipeWasSelected = new EventEmitter<Recipe>()

  recipes: Recipe[]
  subscription: Subscription;
  constructor(private recipeService: recipeService,
    private router: Router,
    private route: ActivatedRoute,
    private store:Store<fromAppReducer.AppState>) { }

  ngOnInit() {
  //  this.subscription = this.recipeService.recipesChanged.subscribe(
  //     (recipes: Recipe[]) => {
  //       this.recipes = recipes;
  //     }
  //   )
    
    this.subscription = this.store.select('recipes')
      .subscribe((recipes: any) => {
        this.recipes = recipes.recipes;
      })
    // this.recipes = this.recipeService.getRecipes();
  }


  // Da Kan Method bageb beha el recipe el Selected 
  // onRecipeSelected(recipe:Recipe) {
  //   this.recipeWasSelected.emit(recipe)
  // }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
