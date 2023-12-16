import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'timer',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent {
  secondsLeft!: number
  @Input() currentSection!: string
  @Input() sectionsList!: any
  @Output() nextSection: any = new EventEmitter<string>()
  // - - [metodo] pause
  // - - [metodo] nextSection

  a() {

  }
}
