import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingrediants } from '../shared/ingrediants.model';
import { shoppingService } from './shopping.service';


@Component({
  selector: 'app-shoping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.css'],
  
})
export class ShopingListComponent implements OnInit, OnDestroy {
  
  private igChangeSub: Subscription; 
  ingrediants: Ingrediants[];
  constructor(private shoppingService : shoppingService) { }

 
  ngOnInit( ) {
    this.ingrediants = this.shoppingService.getIngrediants();

    this.igChangeSub=  this.shoppingService.onChangeIngrediants
      .subscribe(
      (commingIngrediants: Ingrediants[]) => {
        this.ingrediants = commingIngrediants;
      }
    )

    

  }

  onAddItem(index: number) {
    this.shoppingService.startEditing.next(index)
   }

ngOnDestroy(): void {
  this.igChangeSub.unsubscribe()  
}

  // no need as we using service way
  // onIngrediantAdded(ingrediant:Ingrediants) {
  //   this.ingrediants.push(ingrediant);
  // }



}
