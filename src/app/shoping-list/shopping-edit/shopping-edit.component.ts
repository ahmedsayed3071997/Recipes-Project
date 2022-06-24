import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingrediants } from 'src/app/shared/ingrediants.model';

import { shoppingService } from '../shopping.service';
import * as ShoppingListActions from '../store/shopping-list.actions'

import * as fromAppReducer from '../../store/app-reducer'
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amoutInput') amountInputRef: ElementRef;
  subscription: Subscription;
  editMode = false;
  // editeditemIndex: number;
  editedItem: Ingrediants
  @ViewChild("f") slForm: NgForm
  //ingrediantAdded = new EventEmitter < {name:string,amount:number}>()
  // no need as we using service way 
 // @Output() ingrediantAdded = new EventEmitter<Ingrediants>()
  
  constructor(
    private ingrediantService: shoppingService,
    private store: Store<fromAppReducer.AppState>) { }

  ingrediants: Ingrediants[];

  ngOnInit() {
    // this.subscription = this.ingrediantService.startEditing.subscribe(
    //   (index: number) => {
    //     this.editeditemIndex = index;
    //     this.editMode = true;
    //     this.editedItem = this.ingrediantService.getIngrediant(index);
    //     this.slForm.setValue({
    //       name: this.editedItem.name,
    //       amount: this.editedItem.amount
    //     })
    //   }
    //  )
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      // console.log(stateData);
      if (stateData.editedIngrediantIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngrediant;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })

      } else {
        this.editMode = false;
      }
    });

  }
  submitAdd(formProperty: NgForm) {  
    // const ingrediantName = this.nameInputRef.nativeElement.value;
    // const ingrediantAmount = this.amountInputRef.nativeElement.value;
    const value = formProperty.value
    const newIngrediants = new Ingrediants(value.name, value.amount);
    // event Binding Way
    //this.ingrediantAdded.emit(newIngrediants)
    if (this.editMode) {
      // this.ingrediantService.updateIngrediant(this.editeditemIndex, newIngrediants)
      this.store.dispatch(new ShoppingListActions.UpdateIngrediant(newIngrediants))
    } else {
      // this.ingrediantService.addIngrediant(newIngrediants);
      this.store.dispatch(new ShoppingListActions.AddIngrediant(newIngrediants));
    }
    this.editMode = false;
    formProperty.reset();
  }
  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.EndtEdit());
  }
  onDelete() {
    // this.ingrediantService.deletIngrediant(this.editeditemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngrediant())
    this.onClear()
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.EndtEdit());
  }
}
