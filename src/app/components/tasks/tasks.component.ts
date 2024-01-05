import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';

import 'animate.css';
import { Task } from './interfaces/task';
import { TaskComponent } from './components/task/task.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TasksService } from './services/tasks.service';

@Component({
  selector: 'tasks',
  standalone: true,
  imports: [CommonModule, TaskComponent, TaskFormComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  private readonly tasksService = inject(TasksService);
  public showTaskForm = signal<boolean>(false);

  public get tasksList(): Task[] {
    if (!this.tasksService) return [];
    return this.tasksService.tasksList();
  }

  public setShowTaskForm(value: boolean): void {
    this.showTaskForm.set(value);
  }
}
