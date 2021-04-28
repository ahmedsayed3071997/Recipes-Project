import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingrediants } from 'src/app/shared/ingrediants.model';
import { Recipe } from '../recipe.model';
import { recipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  
  
  
  constructor(private recipeService: recipeService,
    private route: ActivatedRoute,
  private router: Router) { }
  
  recipe: Recipe;
  id: number;
 
  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
        }
    )
  }
  
  onAddToShopingList() {
    this.recipeService.onAddIngrediantsToShopingList(this.recipe.ingrediants)
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route})
    //this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route})
  }
  onDeleteRecipe() {
    this.recipeService.deletRecipe(this.id);
    this.router.navigate(['/recipes'])
  }
}
