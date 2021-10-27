import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { AppRoutingMoudule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';
import { HeaderModule } from './header/header.module';
import { CoreModule } from './core.module';

import { StoreModule} from '@ngrx/store'
// import { shoppingListReducer } from './shoping-list/store/shopping-list.reducer';
// import { authReducer } from './auth/store/auth.reducer';
import * as fromAppReducer from './store/app-reducer'
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';

import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from 'src/environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { RecipesEffects } from './recipes/store/recipe.effects';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingMoudule,
    CoreModule,
    SharedModule,
    StoreModule.forRoot(fromAppReducer.appReducers),
    EffectsModule.forRoot([AuthEffects,RecipesEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
    HeaderModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
