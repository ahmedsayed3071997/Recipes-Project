import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingrediants } from "../shared/ingrediants.model";

@Injectable()
export class shoppingService {
    
    //onChangeIngrediants = new EventEmitter<Ingrediants[]>()
    onChangeIngrediants = new Subject<Ingrediants[]>();
    startEditing = new Subject<number>()

    private ingrediants: Ingrediants[] = [
        
        new Ingrediants("Apples",5),
        new Ingrediants("Tomatoes", 10)
        
    ];
    
    getIngrediants() {
        return this.ingrediants.slice()
    }

    getIngrediant(index: number) {
        return this.ingrediants[index];
    }


    addIngrediant(ingrediant: Ingrediants) {
        this.ingrediants.push(ingrediant)
        //this.onChangeIngrediants.emit(this.ingrediants.slice())
        this.onChangeIngrediants.next(this.ingrediants.slice())
    }


    addIngrediants(ingrediants: Ingrediants[]) {
        // for (let ingrediant of ingrediants) {
        //   this.addIngrediant(ingrediant)
        // }

        this.ingrediants.push(...ingrediants);
        //this.onChangeIngrediants.emit(this.ingrediants.slice())
        this.onChangeIngrediants.next(this.ingrediants.slice())

    }
    
    updateIngrediant(index: number, newIngrediant: Ingrediants) {
        this.ingrediants[index] = newIngrediant
        this.onChangeIngrediants.next(this.ingrediants.slice())
    }
    deletIngrediant(index: number) {
        this.ingrediants.splice(index, 1);
        this.onChangeIngrediants.next(this.ingrediants.slice());

    }
}