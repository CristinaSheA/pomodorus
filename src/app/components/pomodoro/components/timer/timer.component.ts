import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
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
  public secondsLeft!: number;
  @Input() public currentSection!: string;
  @Input() public sectionsList!: any;
  @Output() public nextSection: any = new EventEmitter<string>();



  // - - [metodo] pause
  // - - [metodo] nextSection

   timerId!: Subscription;
  constructor(private cdr: ChangeDetectorRef) {}




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
      
    this.timerId = interval(1000).subscribe(() => {
      if (this.secondsLeft > 0) {
        this.secondsLeft--;
        this.getMinutes()
        this.cdr.detectChanges();
      } else {
        this.nextSection.emit();
      }
    });
  }

  min!: number
  sec!: number

  getMinutes(): void {
    const minutes = Math.floor(this.secondsLeft / 60);
    const sec = this.secondsLeft % 60;

    this.min = minutes
    this.sec = sec


    return console.log(`${minutes}:${sec}`);
  }

  // stopTimer() {
  //   if (this.timerId) {
  //     window.clearInterval(this.timerId);
  //     this.timerId = 0;
  //   }
  // }
}
