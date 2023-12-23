import { CommonModule, DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
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

  private sectionsOrder: { name: string; time: number }[] = [
    {
      name: 'pomodoro',
      time: 1500,
    },
    {
      name: 'short-break',
      time: 300,
    },
    {
      name: 'pomodoro',
      time: 1500,
    },
    {
      name: 'short-break',
      time: 300,
    },
    {
      name: 'pomodoro',
      time: 1500,
    },
    {
      name: 'long-break',
      time: 900,
    },
  ];

  private readonly cdr = inject(ChangeDetectorRef);
  private currentSectionIndex = 0;
  private timer!: Subscription;
  public secondsLeft!: number;
  public min!: number;
  public sec!: number;


  constructor(@Inject(DOCUMENT) private document: Document) {}

  
  ngOnChanges(): void {
    this.setTime();
  }

  public startTimer(): void {
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

  public pauseTimer(): void {
    this.timer.unsubscribe();
  }

  public resumeTimer(): void {
    this.timer = interval(1000).subscribe(() => {
      if (this.secondsLeft > 0) {
        this.secondsLeft--;
        this.getMinutes;
        this.cdr.detectChanges();
      }
    });
  }

  public nextSection(): void {
    this.timer.unsubscribe();

    this.currentSectionIndex++;

    if (this.currentSectionIndex >= this.sectionsOrder.length) {
      this.currentSectionIndex = 0;
    }
    this.currentSection = this.sectionsOrder[this.currentSectionIndex].name;
    this.setTime();
    this.getMinutes;

    console.log(this.currentSection);
  }


  public setTime(): void {
    switch (
      this.currentSection ||
      this.sectionsList[this.currentSectionIndex].name
    ) {
      case 'pomodoro':
        this.updateTimerAndBackground(25, 1500,'rgb(186, 73, 73)')
        break;

      case 'short-break':
        this.updateTimerAndBackground(5, 300,'rgb(56, 133, 138)')
        break;

      case 'long-break':
        this.updateTimerAndBackground(15, 900,'rgb(57, 112, 151)')
        break;
    }
  }

  private updateTimerAndBackground(minutes: number, secondsLeft: number, background: string) {
    this.min = minutes;
    this.sec = 0;
    this.secondsLeft = secondsLeft;
    this.document.body.style.background = background;
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
