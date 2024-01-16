import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
  inject,
  signal,
} from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../interfaces/task';
import Swal from 'sweetalert2';
import { TemplatesService } from '../../services/templates.service';

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
  @Output() private showToolbar: EventEmitter<void> = new EventEmitter<void>();
  @Output() private showList: EventEmitter<void> = new EventEmitter<void>();

  
  public tasksService = inject(TasksService);
  public templatesService = inject(TemplatesService);
  private readonly cdr = inject(ChangeDetectorRef);
  private tasks = this.tasksService?.tasksList()
  private templates = this.templatesService?.templatesList()




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
    this.showToolbar.emit()
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
    this.showToolbar.emit()
  }

  public showTemplateForm() {
    this.cdr?.detectChanges();

    if (!this.tasks || this.tasks.length === 0) {
      Swal.fire('Please add tasks first. 📋✅');
    } else {
      if (!this.templates || this.templates.length === 0) {
        this.showForm.emit();
      } else {
        this.showList.emit();
      }
    }
    this.cdr?.detectChanges();
  }

  public showTemplatesList() {
    this.cdr?.detectChanges();

    if (!this.templates || this.templates.length === 0) {
      Swal.fire('Please add templates first. 📋🔢');
    } else {
      this.showList.emit();
    }
    this.cdr?.detectChanges();
  }
}
