import { CommonModule, DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewChild,
  effect,
  inject,
} from '@angular/core';
import { TimerComponent } from './components/timer/timer.component';
import { SectionsComponent } from './components/sections/sections.component';
import { Section } from './interfaces/section';
import { AppStateService } from '../../services/app-state.service';
import { ConfigService } from './../../services/config.service';

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
  private readonly configService = inject(ConfigService);
  public sectionsList: Section[] = [];
  public showStartButton: boolean = true;
  public showPauseAndSkipButtons: boolean = false;
  public showResumeButton: boolean = false;
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.sectionsList = [
      {
        name: 'pomodoro',
        time: (this.appStateService?.pomodoroMinutes() as number) * 60,
      },
      {
        name: 'short-break',
        time: (this.appStateService?.shortBreakMinutes() as number) * 60,
      },
      {
        name: 'long-break',
        time: (this.appStateService?.longBreakMinutes() as number) * 60,
      },
    ];

    effect(() => {
      this.timerComponentRef.getMinutes();
      this.timerComponentRef.setTime();
    });
  }
  public setSection(message: string): void {
    if (this.timerComponentRef.timer) {
      this.timerComponentRef.timer.unsubscribe();
    }
    this.configService!.currentSection = message;
    this.timerComponentRef.getMinutes();
    this.handleTimerEnd();
    this.setShowingButtons(true, false, false);
    switch (this.configService!.currentSection) {
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
      this.configService!.currentSection === 'pomdoro'
    ) {
      this.startTimer();
    }
    if (
      this.appStateService?.autoStartBreaks &&
      this.configService!.currentSection === 'short-break'
    ) {
      this.startTimer();
    }
  }
  public resumeTimer(): void {
    this.timerComponentRef.resumeTimer();
    this.setShowingButtons(false, true, false);
  }
}
