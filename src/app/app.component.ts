import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './auth/auth.service';
import * as fromAppReducer from './store/app-reducer'
import * as fromAuthActions from "./auth/store/auth.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private store:Store<fromAppReducer.AppState>) { }
  ngOnInit() {
    // this.authService.autoLogin();
    this.store.dispatch(new fromAuthActions.AutoLogin());

  }
  // recipesFiredValue = false;
  // shoppingFiredValue = false;
  // gotClicked(recipesClicked:boolean) {
  //   if (recipesClicked === true) {
  //     this.recipesFiredValue = true;
  //   } 
  // }
  theLodedFeatuer = 'recipe';
  
  featuerLoded(featuer:string) {
    this.theLodedFeatuer = featuer;
  }

 
}
