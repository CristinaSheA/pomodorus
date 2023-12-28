import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../../tasks.service';

@Component({
  selector: 'task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent {
  @Input() taskTitle!: string;
  @Input() taskPomodoros!: number;
  @Input() taskDescription!: string | undefined;
  @Input() showTaskForm!: boolean;

  showUpdateButton: boolean = false
  showCreateButton: boolean = true
  
  ngOnChanges(): void {
    this.cdr?.detectChanges();

  }

  public showDescriptionField: boolean = false;

  public readonly tasksService = inject(TasksService)
  private readonly cdr = inject(ChangeDetectorRef);





  public createTask() {
    this.tasksService?.createTask(this.taskTitle, this.taskDescription, this.taskPomodoros )
    this.taskTitle = ''
    this.taskPomodoros = 1
    this.taskDescription = ''

  }

  public onShowDescriptionField() {
    return (this.showDescriptionField = true);
  }
}
