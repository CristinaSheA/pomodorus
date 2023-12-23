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
  @ViewChild(TimerComponent) hijoComponent!: TimerComponent;

  @Output() public currentSection: string = 'pomodoro';
  @Output() public sectionsList: { name: string; time: number }[] = [
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
  public showPauseButton: boolean = false;
  public showResumeButton: boolean = false;
  public showSkipButton: boolean = false;

  public setSection(message: string): void {
    console.log(message);
    this.currentSection = message;
  }

  public startChildTimer(): void {
    this.hijoComponent.startTimer();
    this.showStartButton = false;
    this.showPauseButton = true;
    this.showSkipButton = true;
  }

  public pauseTimer(): void {
    this.showPauseButton = false;
    this.showSkipButton = false;
    this.showResumeButton = true;

    this.hijoComponent.pauseTimer();
  }

  public nextSection(): void {
    this.showStartButton = true;
    this.showPauseButton = false;
    this.showSkipButton = false;

    this.hijoComponent.nextSection();
  }

  public resumeTimer(): void {
    this.showPauseButton = true;
    this.showSkipButton = true;
    this.showResumeButton = false;

    this.hijoComponent.resumeTimer();
  }
}
