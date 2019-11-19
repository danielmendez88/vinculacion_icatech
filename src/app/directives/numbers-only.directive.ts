import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'input[numbersOnly]'
})
export class NumbersOnlyDirective {

  constructor(private el: ElementRef) { }

  @Input() numbersOnly: boolean;

  @HostListener('keydown', ['$event']) onkeydown(event) {
    // tslint:disable-next-line:no-angle-bracket-type-assertion
    const e = <KeyboardEvent> event;
    if (this.numbersOnly) {
      if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
          // permitido ctrl+A
          (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
          // permitido ctrl+c
          (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
          // permitido: Ctrl+V
          (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
          // permitido: Ctrl+X
          (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
          // Permitir: home, end, left, right
          (e.keyCode >= 35 && e.keyCode <= 39)
        ) {
          // let it happen, no hacer algo
        return;
      }
      // asegurate que es un número y deten keypress
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
      }
    }
  }

}
