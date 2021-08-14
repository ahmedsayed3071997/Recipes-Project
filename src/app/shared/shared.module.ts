import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DroppdownDirective } from './droppdown.directive';
import { AlertComponent } from './alert/alert.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingMoudule } from '../app-routing.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlaceholderDirective } from './placeholder.directive';



@NgModule({
  declarations: [
    DroppdownDirective,
    AlertComponent,
    PlaceholderDirective
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AppRoutingMoudule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    AlertComponent,
    HttpClientModule,
    AppRoutingMoudule,
    DroppdownDirective,
    PlaceholderDirective
  ]
})
export class SharedModule { }
