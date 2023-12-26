import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject} from '@angular/core';
import { Task, TaskStatus } from '../../interfaces/task';
import { TasksService } from '../../tasks.service';

@Component({
  selector: 'task',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent { 

  public readonly tasksService = inject(TasksService);


  get tasksList() {
    return this.tasksService?.tasksList();
  }

  public setTaskAsNotDone(task: Task): Task {
    return { ...task, status: TaskStatus.NotDone };
  }

  public setTaskAsDone(task: Task): Task {
    return { ...task, status: TaskStatus.Done };
  }
}
