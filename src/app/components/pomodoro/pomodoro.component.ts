import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { TimerComponent } from './components/timer/timer.component';
import { SectionsComponent } from './components/sections/sections.component';

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

  public currentSection: string = 'pomodoro';
  public sectionsList: { name: string; time: number }[] = [
    {
      name: 'pomodoro',
      time: 1500,
    },
    {
      name: 'short-break',
      time: 300,
    },
    {
      name: 'long-break',
      time: 900,
    },
  ];

  public showStartButton: boolean = true;
  public showPauseAndSkipButtons: boolean = false;
  public showResumeButton: boolean = false;
  public showSkipButton: boolean = false;

  public setSection(message: string): void {
    this.currentSection = message;
    if (this.timerComponentRef.timer) {
      this.timerComponentRef.timer.unsubscribe();
    }
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
