import { Injectable, inject, signal } from '@angular/core';
import { Template } from '../interfaces/template';
import { Task, TaskStatus } from '../interfaces/task';
import { TasksService } from './tasks.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class TemplatesService {
  private tasksService = inject(TasksService);
  public templatesList = signal<Template[]>([
    {
      id: Date.now(),
      title: 'fsafsa',
      tasks: [
        {
          id: Date.now(),
          title: '',
          description: 'description',
          isSelected: false,
          status: TaskStatus.NotDone,
          editMode: false,
          pomodoros: { totalPomodoros: 0, donePomodoros: 0 },
        },
      ],
    },
  ]);

  constructor() {}

  public createTemplate(tasks: Task[], title: string) {
    if (!tasks) return;
    const newTemplate: Template = {
      id: Date.now(),
      title: title,
      tasks: tasks,
    };

    console.log(this.templatesList());

    this.templatesList.update((currentTemplatesList: Template[]) => {
      return [...currentTemplatesList, newTemplate];
    });
  }

  public getTemplates() {}

  public updateTemplate() {}

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
}
