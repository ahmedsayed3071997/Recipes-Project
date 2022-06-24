import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import { recipeService } from '../recipe.service';

import * as fromAppReducer from '../../store/app-reducer'
import * as recipesActions from '../store/recipe.actions'
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit,OnDestroy {

  id: number;
  editMode = false;
  recipeForm: FormGroup;
  storeSub:Subscription
  constructor(private route: ActivatedRoute, private recipeService: recipeService, private router: Router,private store:Store<fromAppReducer.AppState>) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
        // console.log(this.editMode);
        
        
      }
    )
   
  }
  onSubmit() {
  //  console.log(this.recipeForm);
   const newRecipe = new Recipe(
    this.recipeForm.value["name"],
    this.recipeForm.value['recipeDescription'],
    this.recipeForm.value['imagePath'],
    this.recipeForm.value["ingrediants"]
  );
    if (this.editMode) {
      // this.recipeService.updateRecipe(this.id, newRecipe)
      this.store.dispatch(new recipesActions.UpdateRecipe({index:this.id, newRecipe:newRecipe}))

    } else {
      // this.recipeService.addRecipe(newRecipe);
      this.store.dispatch(new recipesActions.AddRecipe(this.recipeForm.value))
    }

    this.onCancel();
    
  }
  onAddIngrediant() {
    (<FormArray>this.recipeForm.get('ingrediants')).push(
      new FormGroup({
        "name": new FormControl(null, Validators.required ),
        "amount": new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }

  onCancel() {
    this.router.navigate(['../',], {relativeTo: this.route})
  }
  onDeleteIngrediant(index: number) {
    (<FormArray>this.recipeForm.get("ingrediants")).removeAt(index);
  }
  private initForm() {
    
    let recipename = "";
    let recipeImagePath = "";
    let recipeDescription = "";

    let recipeIngrediants = new FormArray([])

    if (this.editMode) {
      // const recipe = this.recipeService.getRecipe(this.id);

      this.storeSub = this.store.select('recipes').pipe(
        map(recipeState => {
          return recipeState.recipes.find((recipe,index) => {return index === this.id })
        })
      ).subscribe((recipe) => {
        recipename = recipe.name;
        recipeImagePath = recipe.imagePath;
        recipeDescription = recipe.description;

        if (recipe['ingrediants']) {
          for (let ingrediant of recipe.ingrediants) {
            recipeIngrediants.push(
              new FormGroup({
                "name": new FormControl(ingrediant.name, Validators.required),
                "amount": new FormControl(ingrediant.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
              })
            )
          }
        }
      })

      
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipename, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'recipeDescription': new FormControl(recipeDescription, Validators.required),
      'ingrediants': recipeIngrediants
    });

  }

  ngOnDestroy() {
    this.storeSub?.unsubscribe();
  }
 
}
