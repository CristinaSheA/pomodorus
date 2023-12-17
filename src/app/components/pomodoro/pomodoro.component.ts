import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Output, ViewChild } from '@angular/core';
import { TimerComponent } from './components/timer/timer.component';
import { SectionsComponent } from './components/sections/sections.component';

@Component({
  selector: 'app-pomodoro',
  standalone: true,
  imports: [CommonModule, TimerComponent, SectionsComponent],
  templateUrl: './pomodoro.component.html',
  styleUrl: './pomodoro.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PomodoroComponent {
  @Output() currentSection: string = 'pomodoro';
  @Output() sectionsList: { name: string; time: number }[] = [
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

  longBreakFrequency!: number;

  showStartButton: boolean = true;
  showPauseButton: boolean = false;
  showResumeButton: boolean = false;
  showSkipButton: boolean = false;

  parentMethod(message: string) {
    console.log(message); 
    this.currentSection = message// Imprime: ¡Hola desde el componente hijo!
  }

  @ViewChild(TimerComponent) hijoComponent!: TimerComponent;

  startChildTimer() {
    this.hijoComponent.startTimer();
    this.showStartButton = false;
    this.showPauseButton = true;
    this.showSkipButton = true;
  }

  
  pauseTimer() {
    this.showPauseButton = false;
    this.showSkipButton = false;
    this.showResumeButton = true;

    this.hijoComponent.pauseTimer();
  }

  nextSection() {
    this.showStartButton = true;
    this.showPauseButton = false;
    this.showSkipButton = false;
    
    this.hijoComponent.nextSection();
  }

  resumeTimer() {
    this.showPauseButton = true;
    this.showSkipButton = true;
    this.showResumeButton = false;

    this.hijoComponent.resumeTimer();
  }

  // startTimer() {
  //   switch (this.currentSection) {
  //     case 'pomodoro':
  //       this.secondsLeft = 1500;
  //       break;
  
  //     case 'short-break':
  //       this.secondsLeft = 300;
  //       break;
  //     case 'long-break':
  //       this.secondsLeft = 900;
  //       break;
  
  //     default:
  //       break;
  //   }
      
  //   this.timerId = interval(1000).subscribe(() => {
  //     if (this.secondsLeft > 0) {
  //       this.secondsLeft--;
  //       console.log(this.secondsLeft);
  //       this.getMinutes()
  //     } else {
  //       this.nextSection.emit();
  //     }
  //   });
  // }
}
