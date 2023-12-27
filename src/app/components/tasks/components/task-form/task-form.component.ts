import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
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
  public taskTitle: string = '';
  public taskPomodoros: number = 1;
  public taskDescription: string | undefined = '';

  public showDescriptionField: boolean = false;

  private readonly tasksService = inject(TasksService)

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
