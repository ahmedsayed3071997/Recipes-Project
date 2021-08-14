import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { AppRoutingMoudule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';
import { HeaderModule } from './header/header.module';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/auth.module';


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
    HeaderModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
