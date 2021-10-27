import { Action } from "@ngrx/store";
import { Ingrediants } from "src/app/shared/ingrediants.model";

export const ADD_INGREDIANT = '[Shopping List] Add Ingrediant';
export const ADD_INGREDIANTS = '[Shopping List] Add Ingrediants';
export const UPDATE_INGREDIANTS = '[Shopping List] Update Ingrediants';
export const DELETE_INGREDIANTS = '[Shopping List] Delete Ingrediants';
export const START_EDIT = '[Shopping List] Start Edit';
export const END_EDIT = '[Shopping List] End Edit';




export class AddIngrediant implements Action {
    readonly type = ADD_INGREDIANT;
    constructor(public payload: Ingrediants) {       
    }
}
export class AddIngrediants implements Action {
    readonly type = ADD_INGREDIANTS;
    constructor(public payload:Ingrediants[]) { }
}

export class UpdateIngrediant implements Action {
    readonly type = UPDATE_INGREDIANTS;
    constructor(public payload: Ingrediants) { }
}

export class DeleteIngrediant implements Action {
    readonly type = DELETE_INGREDIANTS;
}

export class StartEdit implements Action {
    readonly type = START_EDIT;
    constructor(public payload: number) { }
}

export class EndtEdit implements Action {
    readonly type = END_EDIT;
}


export type ShoppingListActions = AddIngrediants
    | AddIngrediant
    | UpdateIngrediant
    | DeleteIngrediant
    | StartEdit
    | EndtEdit

