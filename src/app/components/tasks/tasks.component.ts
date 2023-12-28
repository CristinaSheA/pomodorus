import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
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

  public taskTitle: string = '';
  public taskPomodoros: number = 1;
  public taskDescription: string | undefined = '';
  private readonly cdr = inject(ChangeDetectorRef);

  ngOnChanges(): void {
    this.cdr?.detectChanges();
  }

  public onShowTaskForm() {
    return (this.showTaskForm = true);
  }

  public get tasksList() {
    return this.tasksService?.tasksList
  }
}
