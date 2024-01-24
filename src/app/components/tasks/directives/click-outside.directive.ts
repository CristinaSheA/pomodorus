import {
  Directive,
  ElementRef,
  HostListener,
  EventEmitter,
  Output,
  inject,
} from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  standalone: true,
})
export class ClickOutsideDirective {
  @Output() clickOutside: EventEmitter<any> = new EventEmitter<any>();
  private readonly elementRef = inject(ElementRef);
  private clickCount = 0;

  @HostListener('document:click', ['$event'])
  clickOutsideAction(event: Event) {
    if (!this.elementRef!.nativeElement.contains(event.target)) {
      this.clickCount++;
      console.log('Clicked outside:', this.clickCount);

      if (this.clickCount >= 2) {
        this.clickOutside.emit();
        console.log('emited');
      }
    } else {
      console.log('Clicked inside');
    }
  }
}
