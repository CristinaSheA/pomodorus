import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
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
  private readonly appState = inject(AppStateService);


  public currentSection: string = 'pomodoro';

  public sectionsList: Section[] = [
    {
      name: 'pomodoro',
      time: this.appState?.pomodoroMinutes ? this.appState.pomodoroMinutes * 60 : 0,
    },
    {
      name: 'short-break',
      time: this.appState?.pomodoroMinutes ? this.appState.shortBreakMinutes * 60 : 0,
    },
    {
      name: 'long-break',
      time: this.appState?.pomodoroMinutes ? this.appState.longBreakMinutes * 60 : 0,
    },
  ];

  public showStartButton: boolean = true;
  public showPauseAndSkipButtons: boolean = false;
  public showResumeButton: boolean = false;

  public setSection(message: string): void {
    if (this.timerComponentRef.timer) {
      this.timerComponentRef.timer.unsubscribe();
    }

    this.currentSection = message;
    this.timerComponentRef.getMinutes();
    this.timerComponentRef.setTime();
    this.handleTimerEnd();
    this.setShowingButtons(true, false, false);
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

  public startChildTimer(): void {
    this.timerComponentRef.startTimer();
    this.setShowingButtons(false, true, false);
  }

  public pauseTimer(): void {
    this.timerComponentRef.pauseTimer();
    this.setShowingButtons(false, false, true);
  }

  public skipSection(): void {
    this.timerComponentRef.skipSection();
    this.setShowingButtons(true, false, false);
  }

  public resumeTimer(): void {
    this.timerComponentRef.resumeTimer();
    this.setShowingButtons(false, true, false);
  }
}
