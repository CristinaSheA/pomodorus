import { CommonModule, DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  inject,
} from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { Section } from '../../interfaces/section';
import { TasksService } from '../../../tasks/services/tasks.service';
import { AppStateService } from '../../../../services/app-state.service';

@Component({
  selector: 'timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent {
  private readonly appStateService = inject(AppStateService);

  @Input() public currentSection!: string;
  @Input() public sectionsList!: Section[];
  @Input() public longBreakFrequency: number = 1;
  @Output() timerEnded = new EventEmitter<void>();
  @Output() setShowingButtons = new EventEmitter<void>();


  

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
    this.fsa()
  }

  ngOnInit() {
    this.setTime();

  }

  public startTimer(): void {
    this.timer = interval(1000).subscribe(() => {
      if (this.secondsLeft > 0) {
        this.secondsLeft--;
        this.getMinutes();
      } else {
        this.timer.unsubscribe();
        this.skipSection();
        this.timerEnded.emit();
      }
    });

    if (this.appStateService?.darkMode === true) {
      this.document.body.style.background = 'black';
    }
  }

  public pauseTimer(): void {
    this.timer.unsubscribe();
    this.fsa();
  }

  fsa() {
    switch (this.currentSection) {
      case 'pomodoro':
        this.document.body.style.background =
          this.appStateService!.pomodoroColorTheme;
        break;

      case 'short-break':
        this.document.body.style.background =
          this.appStateService!.shortBreakColorTheme;
        break;

      case 'long-break':
        this.document.body.style.background =
          this.appStateService!.longBreakColorTheme;
        break;
    }
  }
  public resumeTimer(): void {
    this.timer = interval(1000).subscribe(() => {
      if (this.secondsLeft > 0) {
        this.secondsLeft--;
        this.getMinutes();
      }
    });
    if (this.appStateService?.darkMode === true) {
      this.document.body.style.background = 'black';
    }
  }
  public skipSection(): void {
    if (this.currentSection === 'pomodoro') {
      this.cdr?.detectChanges();
      this.incrementDonePomodoros();
      this.cdr?.detectChanges();
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

    if (
      (this.currentSection === 'pomodoro' &&
        this.appStateService?.autoStartPomodoros) ||
      ((this.currentSection === 'short-break' ||
        this.currentSection === 'long-break') &&
        this.appStateService?.autoStartBreaks)
    ) {
      this.startTimer();
    }
  }
  public setTime(): void { 
    let index = 0;
    let desiredTime = this.sectionsList[index].time;
    let minutes;

    switch (this.currentSection) {
      case 'pomodoro':
        index = 0;
        break;

      case 'short-break':
        index = 1;
        break;

      case 'long-break':
        index = 2;
        break;
    }

    desiredTime = this.sectionsList[index].time;
    minutes = desiredTime / 60;

    switch (this.currentSection) {
      case 'pomodoro':
        this.updateTimerAndBackground(
          this.appStateService!.pomodoroMinutes,
          'rgb(186, 73, 73)'
        );
        break;

      case 'short-break':
        this.updateTimerAndBackground(
          this.appStateService!.shortBreakMinutes,
          'rgb(56, 133, 138)'
        );
        break;

      case 'long-break':
        this.updateTimerAndBackground(
          this.appStateService!.longBreakMinutes,
          'rgb(57, 112, 151)'
        );
        break;
    }
  }
  public getMinutes(): void {
    const minutes = ~~(this.secondsLeft / 60);
    const sec = this.secondsLeft % 60;

    this.min = minutes;
    this.sec = sec;
    this.cdr?.detectChanges();
  }
  public updateTimerAndBackground(minutes: number, background: string): void {
    this.min = minutes;
    this.sec = 0;
    this.secondsLeft = minutes * 60;
    this.document.body.style.background = background;
  }
  private incrementDonePomodoros(): void {
    this.cdr?.detectChanges();
    this.tasksService?.selectedTask.update((task) => {
      if (!task) return null;
      task.pomodoros.donePomodoros++;
      return task;
    });
    this.cdr?.detectChanges();
  }
}
