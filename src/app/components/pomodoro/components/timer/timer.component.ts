import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  inject,
} from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent {
  @Input() public currentSection!: string;

  private readonly cdr = inject(ChangeDetectorRef);
  private secondsLeft!: number;
  private timer!: Subscription;
  public min!: number;
  public sec!: number;

  startTimer() {
    switch (this.currentSection) {
      case 'pomodoro':
        this.secondsLeft = 1500;
        break;

      case 'short-break':
        this.secondsLeft = 300;
        break;
      case 'long-break':
        this.secondsLeft = 900;
        break;

      default:
        break;
    }

    this.timer = interval(1000).subscribe(() => {
      if (this.secondsLeft > 0) {
        this.secondsLeft--;
        this.getMinutes;
        this.cdr.detectChanges();
      } else {
        this.nextSection();
      }
    });
  }

  pauseTimer(): void {
    console.log('pauseTimer');
    this.timer.unsubscribe()
  }

  resumeTimer(): void {
    console.log('resumeTimer');
    this.timer = interval(1000).subscribe(() => {
      if (this.secondsLeft > 0) {
        this.secondsLeft--;
        this.getMinutes;
        this.cdr.detectChanges();
      } else {
        this.nextSection();
      }
    });
  }
  

  nextSection(): void {
    console.log('nextSection');
  }

  get getMinutes(): void {
    const minutes = Math.floor(this.secondsLeft / 60);
    const sec = this.secondsLeft % 60;

    this.min = minutes;
    this.sec = sec;
    return console.log(`${minutes}:${sec}`);
  }
}
