import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';

@Component({
  selector: 'sections',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './sections.component.html',
  styleUrl: './sections.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionsComponent {
  @Input() public currentSection!: string;

  @Output() setSection!: EventEmitter<string>
  
  @ViewChild(TimerComponent) hijoComponent!: TimerComponent;


  @Output() methodFromChild = new EventEmitter<string>();

  childMethod(a: string) {
    this.methodFromChild.emit(a);
    
  }
  
  
}
