import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, inject} from '@angular/core';
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
  @Input() taskTitle: string = '';
  @Input() taskPomodoros: number = 1;
  @Input() taskDescription: string | undefined = '';
  @Input() task!: any;
  private readonly cdr = inject(ChangeDetectorRef);


  public readonly tasksService = inject(TasksService);

  public editTask(task: Task): void {
    task.editMode = true;
   
    this.taskTitle = task.title;
    this.taskPomodoros = task.pomodoros.totalPomodoros;
    this.taskDescription = task.description;

    this.cdr?.detectChanges();
  }


  
  

  get tasksList() {
    return this.tasksService?.tasksList();
  }
}
