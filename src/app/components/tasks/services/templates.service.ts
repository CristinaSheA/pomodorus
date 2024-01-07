import { Injectable, inject, signal } from '@angular/core';
import { Template } from '../interfaces/template';
import { Task, TaskStatus } from '../interfaces/task';
import { TasksService } from './tasks.service';

@Injectable({
  providedIn: 'root',
})
export class TemplatesService {
  private tasksService = inject(TasksService);
  public templatesList = signal<Template[]>([]);

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

  public deleteTemplate() {}
}
