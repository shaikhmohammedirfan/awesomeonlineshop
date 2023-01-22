import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPrevious]',
})
export class PreviousDirective {
  constructor(private elRef: ElementRef) {}
  @HostListener('click')
  prevBtnClicked() {
    const elBtnPrev =
      this.elRef.nativeElement.parentElement.parentElement.children[0];
    const item = elBtnPrev.getElementsByClassName('item');
    elBtnPrev.prepend(item[item.length - 1]);
    console.log(item);
  }
}
