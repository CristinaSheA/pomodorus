import { Injectable, signal } from '@angular/core';
import { Template } from '../interfaces/template';
import { Task, TaskStatus } from '../interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class TemplatesService {
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
        }
      ],
    }
  ]);

  constructor() {}

  public createTemplate(tasks: Task[]) {}

  public getTemplates() {}

  public updateTemplate() {}

  public deleteTemplate() {}
}
