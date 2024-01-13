import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output, inject } from '@angular/core';
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

  private tasks = this.tasksService?.tasksList();

  ngDoCheck() {
    this.timeLeft()
  }

  public timeLeft() {
    let pomodorosDone = 0;
    if (!this.tasksService) return 0;
    const tasks = this.tasksService.tasksList();
    for (const task of tasks) {
      pomodorosDone += task.pomodoros.totalPomodoros;
    }

    if (!this.appState) return
    return pomodorosDone * this.appState.pomodoroMinutes;
  }
  public allPomodoros() {
    let allPomodoros = 0;
    if (!this.tasks) return;
    for (const task of this.tasks) {
      const pomodorosToAdd = task.pomodoros.totalPomodoros;
      allPomodoros += pomodorosToAdd;
    }

    return allPomodoros;
  }
  public pomodorosDone() {
    let pomodorosDone = 0;
    if (!this.tasksService) return 0;
    const tasks = this.tasksService.tasksList();
    for (const task of tasks) {
      pomodorosDone += task.pomodoros.donePomodoros;
    }
    
    return pomodorosDone;
  }
}
