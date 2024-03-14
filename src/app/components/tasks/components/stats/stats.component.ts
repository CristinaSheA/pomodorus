import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { AppStateService } from '../../../../services/app-state.service';

@Component({
  selector: 'stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css',
})
export class StatsComponent {
  private readonly tasksService = inject(TasksService);
  private readonly appState = inject(AppStateService);

  public timeLeft() {
    if (!this.tasksService) return 0;
    const tasks = this.tasksService.tasksList();

    const totalPomodoros = tasks.reduce((total, task) => {
      return total + task.pomodoros.totalPomodoros;
    }, 0);

    if (!this.appState) return;
    return totalPomodoros * this.appState.pomodoroMinutes();
  }
  public allPomodoros() {
    if (!this.tasksService) return 0;
    const tasks = this.tasksService.tasksList();

    const totalPomodoros = tasks.reduce((total, task) => {
      return total + task.pomodoros.totalPomodoros;
    }, 0);
    return totalPomodoros;
  }
  public pomodorosDone() {
    if (!this.tasksService) return 0;
    const tasks = this.tasksService.tasksList();

    const pomodorosDone = tasks.reduce((total, task) => {
      return total + task.pomodoros.donePomodoros;
    }, 0);
    return pomodorosDone;
  }
}
