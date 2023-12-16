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
  @Output() nextSection: any = new EventEmitter<string>()
  pauseTimer() {
    this.nextSection.emit('¡Hola desde el componente hijo!');
  }
  
}
