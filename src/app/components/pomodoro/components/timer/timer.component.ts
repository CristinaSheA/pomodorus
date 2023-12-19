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
  @Input() public sectionsList!: { name: string; time: number }[];
  @Input() public longBreakFrequency: number = 2;

  private readonly cdr = inject(ChangeDetectorRef);
  public secondsLeft!: number;
  private timer!: Subscription;
  public min!: number;
  public sec!: number;

  setTime() {
    switch (this.currentSection) {
      case 'pomodoro':
        this.min = 25
        this.sec = 0
        this.secondsLeft = 1500;
        break;

      case 'short-break':
        this.min = 5
        this.sec = 0
        this.secondsLeft = 300;
        break;
      case 'long-break':
        this.min = 15
        this.sec = 0
        this.secondsLeft = 900;
        break;

      default:
        break;
    }
  }


  ngOnChanges() {
    this.setTime()
  }


  startTimer() {
    this.setTime()

    this.min = Math.floor(this.secondsLeft / 60);
    this.sec = this.secondsLeft % 60;

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
    this.timer.unsubscribe();
  }

  resumeTimer(): void {
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

  private currentSectionIndex = 0;
  private pomodoroCount = 0;

  nextSection(): void {
    this.timer.unsubscribe();
    this.currentSectionIndex++;
    if (this.currentSectionIndex >= this.sectionsList.length) {
      this.currentSectionIndex = 0;
    }
    this.currentSection = this.sectionsList[this.currentSectionIndex].name;
    this.setTime()

    if (this.currentSection === 'pomodoro') {
      this.pomodoroCount++;
      this.secondsLeft = 1500
   
    }
    if (this.pomodoroCount === this.longBreakFrequency) {
      this.currentSection = 'long-break';
      this.secondsLeft = 900
      this.pomodoroCount = 0;
    }

    console.log(this.currentSection);
  }
  

  get getMinutes(): void {
    const minutes = Math.floor(this.secondsLeft / 60);
    const sec = this.secondsLeft % 60;
  
    this.min = minutes;
    this.sec = sec;
    this.cdr.detectChanges();
    return console.log(`${minutes}:${sec}`);
  }
}
