import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  inject,
} from '@angular/core';
import { Task } from '../../interfaces/task';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  private readonly tasksService = inject(TasksService);
  @Input() public task!: Task;

  public editTask(task: Task): void {
    task.editMode = true;
  }

  public deleteTask(task: Task) {
    this.tasksService?.deleteTask(task)
  }

  public toggleTaskStatus(task: Task) {
    this.tasksService?.toggleTaskStatus(task)
  }

  public selectTask(task: Task) {
    this.tasksService?.selectTask(task)
  }

  public get tasksList(): Task[] | undefined {
    return this.tasksService?.tasksList();
  }
}
