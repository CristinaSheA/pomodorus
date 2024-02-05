import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PomodoroComponent } from './components/pomodoro/pomodoro.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { ConfigComponent } from './components/config/config.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PomodoroComponent,
    TasksComponent,
    ConfigComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public showSettings = false

  setShowSettings(value: boolean) {
    this.showSettings = value
  }
  title = 'pomodoro';
}
