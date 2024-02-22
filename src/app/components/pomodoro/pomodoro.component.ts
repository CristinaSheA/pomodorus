import { CommonModule, DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewChild,
  inject,
} from '@angular/core';
import { TimerComponent } from './components/timer/timer.component';
import { SectionsComponent } from './components/sections/sections.component';
import { Section } from './interfaces/section';
import { AppStateService } from '../../services/app-state.service';

@Component({
  selector: 'pomodoro-main',
  standalone: true,
  imports: [CommonModule, TimerComponent, SectionsComponent],
  templateUrl: './pomodoro.component.html',
  styleUrl: './pomodoro.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PomodoroComponent {
  @ViewChild(TimerComponent) timerComponentRef!: TimerComponent;
  private readonly appStateService = inject(AppStateService);
  public currentSection: string = 'pomodoro';
  public sectionsList: Section[] = [
    {
      name: 'pomodoro',
      time: this.appStateService?.pomodoroMinutes
        ? this.appStateService.pomodoroMinutes * 60
        : 0,
    },
    {
      name: 'short-break',
      time: this.appStateService?.pomodoroMinutes
        ? this.appStateService.shortBreakMinutes * 60
        : 0,
    },
    {
      name: 'long-break',
      time: this.appStateService?.pomodoroMinutes
        ? this.appStateService.longBreakMinutes * 60
        : 0,
    },
  ];
  public showStartButton: boolean = true;
  public showPauseAndSkipButtons: boolean = false;
  public showResumeButton: boolean = false;
  constructor(@Inject(DOCUMENT) private document: Document) {}

  public setSection(message: string): void {
    if (this.timerComponentRef.timer) {
      this.timerComponentRef.timer.unsubscribe();
    }
    this.currentSection = message;
    this.timerComponentRef.getMinutes();
    this.timerComponentRef.setTime();
    this.handleTimerEnd();
    this.setShowingButtons(true, false, false);
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
  public handleTimerEnd(): void {
    this.setShowingButtons(true, false, false);
  }
  public setShowingButtons(
    start: boolean,
    pauseAndSkip: boolean,
    resume: boolean
  ): void {
    this.showStartButton = start;
    this.showPauseAndSkipButtons = pauseAndSkip;
    this.showResumeButton = resume;
  }
  public startTimer(): void {
    this.setShowingButtons(false, true, false);
    this.timerComponentRef.startTimer();
  }
  public pauseTimer(): void {
    this.timerComponentRef.pauseTimer();
    this.setShowingButtons(false, false, true);
  }
  public skipSection(): void {
    this.timerComponentRef.skipSection();
    this.setShowingButtons(true, false, false);

    if (
      this.appStateService?.autoStartPomodoros &&
      this.currentSection === 'pomdoro'
    ) {
      this.startTimer();
    }
    if (
      this.appStateService?.autoStartBreaks &&
      this.currentSection === 'short-break'
    ) {
      this.startTimer();
    }
  }
  public resumeTimer(): void {
    this.timerComponentRef.resumeTimer();
    this.setShowingButtons(false, true, false);
  }
}
