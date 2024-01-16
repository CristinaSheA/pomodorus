import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  inject,
} from '@angular/core';
import { TemplatesService } from '../../services/templates.service';
import { Template } from '../../interfaces/template';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../interfaces/task';
import Swal from 'sweetalert2';

@Component({
  selector: 'templates-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './templates-list.component.html',
  styleUrl: './templates-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplatesListComponent {
  private readonly templatesService = inject(TemplatesService);
  private readonly tasksService = inject(TasksService);
  public templates = this.templatesService?.templatesList();
  public tasks = this.tasksService?.tasksList();

  @Output() private hideList: EventEmitter<void> = new EventEmitter<void>();
  @Output() public showForm: EventEmitter<void> = new EventEmitter<void>();

  showTemplatesForm() {
    this.showForm.emit();
  }

  public templatesList() {
    return this.templatesService?.templatesList();
  }
  public insertFromTemplate(template: Template) {
    const tasksToAdd = template.tasks;
    if (!this.tasksService) return;
    this.tasksService.tasksList.update((currentTasksList: Task[]) => {
      return [...currentTasksList, ...tasksToAdd];
    });
    this.hideList.emit();
  }

  public chooseTemplateAction(template: Template) {
    Swal.fire({
      title: 'What do you want to do? 🤔',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: 'rgb(56, 133, 138)',
      cancelButtonColor: 'rgb(57, 112, 151)',
      confirmButtonText: 'Update the template',
      cancelButtonText: 'Insert from the template',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(template.tasks);
        this.templatesService?.updateTemplate(template);
        console.log(template.tasks);
        this.hideList.emit();
      } else {
        this.insertFromTemplate(template);
      }
    });
  }

  public deleteTemplate(templateToDelete: Template) {
    if (!this.templatesService) return;
    this.templatesService.deleteTemplate(templateToDelete);
    this.hideList.emit();
  }
}
