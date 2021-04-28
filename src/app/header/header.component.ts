import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

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

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }
  userSub:Subscription 
  ngOnInit() {
    this.userSub = this.authService.user.subscribe(
      (user) => {
        this.isAuthanticated = !!user;
        console.log(!user);
        console.log(!!user);
        
        
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
    this.dataStorageService.storRecipe()
  }
  onFetchData() {
    this.dataStorageService.fetchData().subscribe()
  }
  onLogout() {
    this.authService.logout()
  }
  ngOnDestroy() {
    this.userSub.unsubscribe()
  }

}
