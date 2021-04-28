import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) { }
  ngOnInit() {
    this.authService.autoLogin();
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
