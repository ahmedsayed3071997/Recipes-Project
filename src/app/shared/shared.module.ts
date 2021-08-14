import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DroppdownDirective } from './droppdown.directive';
import { AlertComponent } from './alert/alert.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlaceholderDirective } from './placeholder.directive';
import { LoadingSpinerComponent } from '../loading-spiner/loading-spiner.component';



@NgModule({
  declarations: [
    DroppdownDirective,
    AlertComponent,
    PlaceholderDirective,
    LoadingSpinerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    AlertComponent,
    DroppdownDirective,
    PlaceholderDirective,
    LoadingSpinerComponent
  ]
})
export class SharedModule { }
