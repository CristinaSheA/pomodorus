import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TimerComponent } from './components/timer/timer.component';
import { SectionsComponent } from './components/sections/sections.component';

@Component({
  selector: 'app-pomodoro',
  standalone: true,
  imports: [
    CommonModule,
    TimerComponent,
    SectionsComponent,
  ],
  templateUrl: './pomodoro.component.html',
  styleUrl: './pomodoro.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PomodoroComponent {
  currentSection!: string
  sectionsList: { name: string, time: number }[] = [
    {
      name: 'pomodoro', time: 1500
    },
    {
      name: 'short-break', time: 300
    },
    {
      name: 'long-break', time: 900
    },
  ]

  longBreakFrequency!: number

  showStartButton : boolean = true
  showPauseButton : boolean = false
  showResumeButton: boolean = false
  showSkipButton  : boolean = false
  
  parentMethod(message: string) {
    console.log(message); // Imprime: ¡Hola desde el componente hijo!
  }
}
