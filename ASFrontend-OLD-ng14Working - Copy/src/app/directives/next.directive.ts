import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNext]',
})
export class NextDirective {
  constructor(private elRef: ElementRef) {}
  @HostListener('click')
  nextBtnClicked() {
    var elBtnNext =
      this.elRef.nativeElement.parentElement.parentElement.children[0];
    var item = elBtnNext.getElementsByClassName('item');
    console.log(item[0]);
    elBtnNext.append(item[0]);
  }
}
