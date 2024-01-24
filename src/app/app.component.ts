import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PomodoroComponent } from './components/pomodoro/pomodoro.component';
import { TasksComponent } from './components/tasks/tasks.component';
import Swal from 'sweetalert2';
import { StatsComponent } from './components/tasks/components/stats/stats.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PomodoroComponent,
    TasksComponent
  ],

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'pomodoro';
}
