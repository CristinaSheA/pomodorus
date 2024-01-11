import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';

import 'animate.css';
import { Task } from './interfaces/task';
import { TaskComponent } from './components/task/task.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TasksService } from './services/tasks.service';
import Swal from 'sweetalert2';
import { TemplateFormComponent } from './components/template-form/template-form.component';
import { TemplatesListComponent } from './components/templates-list/templates-list.component';
import { StatsComponent } from './components/stats/stats.component';

@Component({
  selector: 'tasks',
  standalone: true,
  imports: [CommonModule, TaskComponent, TaskFormComponent, TemplateFormComponent, TemplatesListComponent, StatsComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  private readonly tasksService = inject(TasksService);
  public showTaskForm = signal<boolean>(false);
  public showTemplateForm = signal<boolean>(false);
  public showTemplatesList = signal<boolean>(false);

  public get tasksList(): Task[] {
    if (!this.tasksService) return [];
    return this.tasksService.tasksList();
  }

  public setShowTaskForm(value: boolean): void {
    this.showTaskForm.set(value);
  }

  public setShowTemplateForm(value: boolean): void {
    this.showTemplateForm.set(value);
  } 

  public setShowTemplatesList(value: boolean): void {
    this.showTemplatesList.set(value);
  }

  public confirmTaskChanges(): void {
    this.setShowTaskForm(true);

    for (const task of this.tasksList) {
      if (task.editMode === true) {
        Swal.fire({
          title: 'Are you sure?',
          text: "Your task won't change!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: 'rgb(81 138 88)',
          cancelButtonColor: 'rgb(186, 73, 73)',
          confirmButtonText: 'Yes, cancel the edit!',
        }).then((result) => {
          if (result.isConfirmed) {
            task.editMode = false;
            this.setShowTaskForm(true);
          } else {
            this.setShowTaskForm(false);
          }
        });
      }
    }
  }
}
