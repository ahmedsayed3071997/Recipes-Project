import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingrediants } from "../shared/ingrediants.model";
import { shoppingService } from "../shoping-list/shopping.service";
import { Recipe } from "./recipe.model";
@Injectable()
export class recipeService {
    
    //recipeSelected = new EventEmitter<Recipe>()
    recipeSelected = new Subject<Recipe>()

    recipesChanged = new Subject<Recipe[]>();

//    private recipes: Recipe[] = [
//        new Recipe(
//            "Test Recipe",
//            "This is the Easy Way to Create Burger",
//            "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/12/20/2/FNM_010113-Chocolate-Cake-Recipes_s4x3.jpg.rend.hgtvcom.826.620.suffix/1371613583080.jpeg",
//            [
//                new Ingrediants("Meat",1),
//                new Ingrediants("Frise", 20),
//                new Ingrediants("Meat",1),
//                new Ingrediants("Frise",20)
//            ]),
//     new Recipe(
//             "Test Recipe",
//             "This is the Easy Way to Create Burger",
//             "https://media.istockphoto.com/photos/fresh-burger-isolated-picture-id1125149183?k=6&m=1125149183&s=612x612&w=0&h=KxSfVUk3KP3BgHVYboyL9aRLHp-fRYrfPcFea0w68Ow=",
//             [
//                 new Ingrediants("Meat",1),
//                new Ingrediants("Frise", 20),
//                new Ingrediants("Meat",1),
//                new Ingrediants("Frise",20)
//             ]),
//         new Recipe(
//             "Test Recipe",
//             "This is the Easy Way to Create Burger",
//             "https://www.seriouseats.com/recipes/images/2015/07/20150702-sous-vide-hamburger-anova-primary-1500x1125.jpg",
//             [
//                 new Ingrediants("Meat",1),
//                 new Ingrediants("Frise", 20),
//                 new Ingrediants("Meat",1),
//                 new Ingrediants("Frise",20)
//             ])
        
//     ];
    
    
    //now we are Storing Data in a Server
    private recipes: Recipe[] = [];

    constructor(private shoppingService: shoppingService) { }
    

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    onAddIngrediantsToShopingList(ingrediants: Ingrediants[]) {
        this.shoppingService.addIngrediants(ingrediants)
    }

    getRecipe(id:number) {

        return this.recipes[id]
    }
    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());

    }
    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }
    deletRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice())
    }
}