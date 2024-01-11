import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output, inject } from '@angular/core';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css',
})
export class StatsComponent {
  private tasksService = inject(TasksService);
  // @Output() private allPomodorosDone: EventEmitter<void> = new EventEmitter<void>();

  public get timeLeft() {
    return;
  }
  public get allPomodoros() {
    let allPomodoros = 0;
    if (!this.tasksService) return 0;
    const tasks = this.tasksService.tasksList();
    for (const task of tasks) {
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
    console.log(pomodorosDone);
    
    return pomodorosDone;
  }
}
