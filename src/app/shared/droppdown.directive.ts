import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDroppdown]'
})
export class DroppdownDirective {
  @HostBinding("class.open") isOpen = false;
  @HostListener("click") toggleOpen() {
    this.isOpen  = !this.isOpen
   } 
  constructor() { }

}
