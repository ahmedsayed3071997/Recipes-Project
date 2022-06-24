import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromAppReducer from '../store/app-reducer';
import * as fromAuthActions from '../auth/store/auth.actions'
import * as fromRecipesActions from '../recipes/store/recipe.actions'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthanticated = false;

  // @Output() recipesFired = new EventEmitter<boolean>()
  // @Output() shoppingFired = new EventEmitter<boolean>()
  // recipesClicked: boolean = false;
  // shoppinClicked: boolean = false;


  // max Solution 

@Output() featuerSelected = new EventEmitter<string>()

  constructor(private dataStorageService: DataStorageService, private authService: AuthService, private store:Store<fromAppReducer.AppState>) { }
  userSub:Subscription 
  ngOnInit() {
    this.userSub = this.store.select('auth').pipe(map(authData => { return authData.user})).subscribe(
      (user) => {
        this.isAuthanticated = !!user;
        // console.log(!user);
        // console.log(!!user);
      }

    )

  }
  // goRecipes() {
  //   this.recipesFired.emit(this.recipesClicked = true)
  //   this.recipesFired.emit(this.shoppinClicked = false)
  //   console.log("I Clicked Recipes")
  // }
  // goShopping() {
  //   this.shoppingFired.emit(this.shoppinClicked = true)
  //   this.shoppingFired.emit(this.recipesClicked = false)
  //   console.log("I Clicked Shopping");
    

  // }

            // max solution
  
 
  
  // For Navigation With Event Emiter
  // onSelect(featuer:string) {
  //   this.featuerSelected.emit(featuer)
  // }


  onSaveData() {
    // this.dataStorageService.storRecipe()
    this.store.dispatch(new fromRecipesActions.StoreRecipe());
  }
  onFetchData() {
    // this.dataStorageService.fetchData().subscribe();
    this.store.dispatch(new fromRecipesActions.FetchRecipes());

  }
  onLogout() {
    // this.authService.logout();
    this.store.dispatch(new fromAuthActions.Logout());
  }
  ngOnDestroy() {
    this.userSub.unsubscribe()
  }

}
