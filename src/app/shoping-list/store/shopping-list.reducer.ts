import * as  ShoppingListActions from "../store/shopping-list.actions" 
import { Ingrediants } from "../../shared/ingrediants.model";

export interface State {
    ingrediants: Ingrediants[],
    editedIngrediant: Ingrediants,
    editedIngrediantIndex: number
}



const initialState:State = {
    ingrediants: [new Ingrediants("Apples", 5), new Ingrediants("Tomatoes", 10)],
    editedIngrediant: null,
    editedIngrediantIndex: -1
}

export function shoppingListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIANT:
            return {
                ...state,
                ingrediants: [...state.ingrediants, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIANTS:
            return {
                ...state,
                ingrediants: [...state.ingrediants, ...action.payload]
            };
        case ShoppingListActions.UPDATE_INGREDIANTS:
            const ingrediant = state.ingrediants[state.editedIngrediantIndex];
            const updateIngrediant = {
                ...ingrediant,
                ...action.payload
            };
            const updatedIngrediants = [...state.ingrediants];
            updatedIngrediants[state.editedIngrediantIndex] = updateIngrediant;
            return {
                ...state,
                ingrediants: updatedIngrediants,
                editedIngrediantIndex: -1,
                editedingrediant: null
            };
        case ShoppingListActions.DELETE_INGREDIANTS:
            return {
                ...state,
                ingrediants: state.ingrediants.filter((ig, igIndex) => {
                    return igIndex !== state.editedIngrediantIndex;
                }),
                editedIngrediantIndex: -1,
                editedingrediant: null
            };
        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngrediantIndex: action.payload,
                editedIngrediant: {...state.ingrediants[action.payload]}
            };
        case ShoppingListActions.END_EDIT:
            return {
                ...state,
                editedIngrediant:null,
                editedIngrediantIndex: -1
            };
        default:
             return state;
    }
}