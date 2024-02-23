import { CommonModule } from '@angular/common';
import {
  Component,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';

import 'animate.css';
import { Task } from './interfaces/task';
import { TaskComponent } from './components/task/task.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TasksService } from './services/tasks.service';
import Swal from 'sweetalert2';
import { TemplateFormComponent } from './components/template-form/template-form.component';
import { TemplatesListComponent } from './components/templates-list/templates-list.component';
import { StatsComponent } from './components/stats/stats.component';
import { TasksToolbarComponent } from './components/tasks-toolbar/tasks-toolbar.component';

import { ClickOutsideDirective } from './directives/click-outside.directive';
import { TemplateActions } from './enums/templateAction';

@Component({
  selector: 'tasks',
  standalone: true,
  imports: [
    CommonModule,
    TaskComponent,
    TaskFormComponent,
    TemplateFormComponent,
    TemplatesListComponent,
    TasksToolbarComponent,
    StatsComponent,
    ClickOutsideDirective,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  private readonly tasksService = inject(TasksService);
  public templatesWindowMode: WritableSignal<false | string> = signal(false);
  public showTasksToolbar = signal<boolean>(false);
  public showStats = signal<boolean>(false);
  public taskFormOpened = signal(false);
  action!: TemplateActions | null

  

  public get tasksList(): Task[] {
    if (!this.tasksService) return [];
    return this.tasksService.tasksList();
  }
  public manageTemplatesWindow(newState: string | false, templateAction: TemplateActions | null) {
    this.templatesWindowMode.set(newState);
    this.showTasksToolbar.set(false);

    this.action = templateAction
  }
  public setShowStats(value: boolean) {
    this.showStats.set(value);
  }
  public setShowTaskForm(value: boolean): void {
    this.taskFormOpened.set(value);
  }
  public setShowTasksToolbar(value: boolean): void {
    this.showTasksToolbar.set(value);
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
  public hideAllPopups() {
    this.setShowTasksToolbar(false)
    this.setShowTaskForm(false)
    this.manageTemplatesWindow(false, null)
  }
}
