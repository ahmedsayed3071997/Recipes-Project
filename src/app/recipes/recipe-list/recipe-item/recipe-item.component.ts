import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { recipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
 

  //@Output() recipeSelected = new EventEmitter<void>()
  @Input() recipe: Recipe;
  @Input() index: number;
  constructor(private recipeService: recipeService) { }

  ngOnInit()  {
  }

      // this With The input and Output
  // itemClicked() {
  //   this.recipeSelected.emit()
  // }

  //  this with service

  

}
