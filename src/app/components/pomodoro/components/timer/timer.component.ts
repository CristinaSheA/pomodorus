import { CommonModule, DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  inject,
} from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { Section } from '../../interfaces/section';
import { TasksService } from '../../../tasks/services/tasks.service';

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
  @Input() public sectionsList!: Section[];
  @Input() public longBreakFrequency: number = 3;
  @Input() private setShowingButtons: EventEmitter<boolean> =
  new EventEmitter<boolean>()

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly tasksService = inject(TasksService);

  private currentPomodoroCount: number = 0;
  public timer!: Subscription;
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
        this.getMinutes();
        this.cdr?.detectChanges();
      } else {
        // if (this.currentSection === 'pomodoro') {
        //   this.incrementDonePomodoros();
        // }
        this.timer.unsubscribe();
        this.setShowingButtons.emit()
        this.skipSection();
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
        this.getMinutes();
        this.cdr?.detectChanges();
      }
    });
  }

  public skipSection(): void {
    if (this.currentSection === 'pomodoro') {
      this.incrementDonePomodoros();
    }

    this.timer.unsubscribe();

    if (this.currentSection === 'pomodoro') {
      this.currentPomodoroCount++;
    }

    this.currentSection =
      this.currentSection === 'pomodoro' &&
      this.currentPomodoroCount % this.longBreakFrequency === 0
        ? 'long-break'
        : this.currentSection === 'pomodoro'
        ? 'short-break'
        : 'pomodoro';
    this.setTime();
    this.getMinutes();
  }

  private setTime(): void {
    switch (this.currentSection) {
      case 'pomodoro':
        this.updateTimerAndBackground(1, 'rgb(186, 73, 73)');
        break;

      case 'short-break':
        this.updateTimerAndBackground(1, 'rgb(56, 133, 138)');
        break;

      case 'long-break':
        this.updateTimerAndBackground(15, 'rgb(57, 112, 151)');
        break;
    }
  }

  private incrementDonePomodoros(): void {
      this.tasksService?.selectedTask.update((task) => {
        if (!task) return null;
        task.pomodoros.donePomodoros++;
        return task;
      });
  }

  private updateTimerAndBackground(minutes: number, background: string): void {
    this.min = minutes;
    this.sec = 0;
    this.secondsLeft = minutes * 60;
    this.document.body.style.background = background;
  }

  private getMinutes(): void {
    const minutes = ~~(this.secondsLeft / 60);
    const sec = this.secondsLeft % 60;

    this.min = minutes;
    this.sec = sec;
    this.cdr?.detectChanges();
  }
}
