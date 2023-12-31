import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  WritableSignal,
  inject,
} from '@angular/core';
import { TasksService } from './services/tasks.service';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskComponent } from './components/task/task.component';
import 'animate.css';
import { ShowingPartsService } from './services/showing-parts.service';
import { Task } from './interfaces/task';

@Component({
  selector: 'tasks',
  standalone: true,
  imports: [CommonModule, TaskComponent, TaskFormComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent {
  private readonly showingPartsService = inject(ShowingPartsService);
  public readonly tasksService = inject(TasksService);
  private readonly cdr = inject(ChangeDetectorRef);

  ngOnChanges(): void {
    this.cdr?.detectChanges();
  }
  
  public get showTaskForm(): boolean | undefined {
    return this.showingPartsService?.showTaskForm
  }
  public onShowTaskForm(): true | null {
    return (this.showingPartsService && (this.showingPartsService.showTaskForm = true));
  }
  public get tasksList(): WritableSignal<Task[]> | undefined {
    return this.tasksService?.tasksList;
  }
}
