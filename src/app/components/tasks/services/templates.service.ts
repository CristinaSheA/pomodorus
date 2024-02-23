import { Injectable, inject, signal } from '@angular/core';
import { Template } from '../interfaces/template';
import { Task } from '../interfaces/task';
import { TasksService } from './tasks.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class TemplatesService {
  private tasksService = inject(TasksService);
  public templatesList = signal<Template[]>([]);

  public createTemplate(title: string) {
    if (!this.tasksService) return;
    const tasks: Task[] = this.tasksService.tasksList();

    if (!tasks) return;
    const newTemplate: Template = {
      id: Date.now(),
      title: title,
      tasks: tasks,
    };

    

    this.tasksService!.selectedTask = signal<Task | null>(null)

    this.templatesList.update((currentTemplatesList: Template[]) => {
      return [...currentTemplatesList, newTemplate];
    });
  }

  public updateTemplate(template: Template) {
    if (!template.tasks) return;

    const tasks = this.tasksService?.tasksList();
    if (!tasks) return;
    template.tasks = tasks;
  }

  public deleteTemplate(templateToDelete: Template) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(81 138 88)',
      cancelButtonColor: 'rgb(186, 73, 73)',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.templatesList.update((currentTemplatesList: Template[]) => {
          return currentTemplatesList.filter(
            (template) => template.id !== templateToDelete.id
          );
        });
      }
    });
  }

  public updateTemplateLocalStorage() {
    localStorage.setItem('templates', JSON.stringify(this.templatesList));
  }
}
