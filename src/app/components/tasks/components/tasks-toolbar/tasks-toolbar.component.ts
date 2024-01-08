import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  inject,
  signal,
} from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../interfaces/task';
import Swal from 'sweetalert2';

@Component({
  selector: 'tasks-toolbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks-toolbar.component.html',
  styleUrl: './tasks-toolbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksToolbarComponent {
  @Output() private showForm: EventEmitter<void> = new EventEmitter<void>();
  @Output() private showList: EventEmitter<void> = new EventEmitter<void>();
  
  public tasksService = inject(TasksService);

  public deleteAllTasks() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(81 138 88)',
      cancelButtonColor: 'rgb(186, 73, 73)',
      confirmButtonText: 'Yes, delete them!',
    }).then((result) => {
      if (result.isConfirmed) {
        if (!this.tasksService) return;
        this.tasksService.tasksList = signal<Task[]>([]);
      }
    });
  }
  public deleteCompletedTasks() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(81 138 88)',
      cancelButtonColor: 'rgb(186, 73, 73)',
      confirmButtonText: 'Yes, delete them!',
    }).then((result) => {
      if (result.isConfirmed) {
        if (!this.tasksService) return;
        this.tasksService.tasksList.update((currentTasksList: Task[]) => {
          return currentTasksList.filter((task) => task.status !== 'DONE');
        });
      }
    });
  }

  public showTemplateForm() {
    this.showForm.emit()
  }

  public showTemplatesList() {
    this.showList.emit()
  }
}
