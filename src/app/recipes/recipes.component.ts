import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { recipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: []
})
export class RecipesComponent implements OnInit {
  constructor(private recipeService: recipeService) { }

  theRecipe: Recipe
  
  ngOnInit() {
    this.recipeService.recipeSelected.subscribe(
      (recipe: Recipe) => {
        this.theRecipe = recipe
      }
      )
  }


  

  // This is With Event Binding

  // @Input() theRecipe:Recipe

  // recipeSelected(reciipe:Recipe) {
  //   this.theRecipe = reciipe
  // }
}
