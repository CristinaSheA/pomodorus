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
import { TemplatesService } from '../../services/templates.service';
import { TemplateActions } from '../../directives/enums/templateAction';

@Component({
  selector: 'tasks-toolbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks-toolbar.component.html',
  styleUrl: './tasks-toolbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksToolbarComponent {
  @Output() private manageFormTemplateWindow: EventEmitter<void> =
    new EventEmitter<void>();
  @Output() private manageListTemplateWindow: EventEmitter<TemplateActions> =
    new EventEmitter<TemplateActions>();
  @Output() private saveAsTemplate: EventEmitter<void> =
    new EventEmitter<void>();
  @Output() private showToolbar: EventEmitter<void> = new EventEmitter<void>();
  private readonly tasksService = inject(TasksService);
  private readonly templatesService = inject(TemplatesService);
  private tasks = this.tasksService?.tasksList();
  private templates = this.templatesService?.templatesList();

  public onSaveAsTemplate() {
    this.saveAsTemplate.emit();
  }
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
    this.showToolbar.emit();
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
    this.showToolbar.emit();
  }
  public showTemplateForm() {
    if (!this.tasks || this.tasks.length === 0) {
      Swal.fire('Please add tasks first. 📋✅');
    } else {
      if (!this.templates || this.templates.length === 0) {
        this.manageFormTemplateWindow.emit();
      } else {
        this.manageListTemplateWindow.emit(TemplateActions.SaveAsTemplate);
      }
    }
  }
  public showTemplatesList() {
    if (!this.templates || this.templates.length === 0) {
      Swal.fire('Please add templates first. 📋🔢');
    } else {
      this.manageListTemplateWindow.emit(TemplateActions.LoadFromTemplate);
    }
  }
}
