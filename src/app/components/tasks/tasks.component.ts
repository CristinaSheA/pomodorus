import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TasksService } from './tasks.service';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskComponent } from './components/task/task.component';
import 'animate.css'

@Component({
  selector: 'tasks',
  standalone: true,
  imports: [
    CommonModule,
    TaskComponent,
    TaskFormComponent,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent {
  private readonly tasksService = inject(TasksService);
  public showTaskForm: boolean = false

  public onShowTaskForm() {
    return (this.showTaskForm = true);
  }

  public get tasksList() {
    return this.tasksService?.tasksList
  }
}
