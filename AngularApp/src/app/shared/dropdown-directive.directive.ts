import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdownDirective]'
})
export class DropdownDirectiveDirective {
  
  @HostBinding('class.open') isopen=false;
  @HostListener('click') toggledropdown(){
    this.isopen=!this.isopen;
  }
  constructor() { }

}
