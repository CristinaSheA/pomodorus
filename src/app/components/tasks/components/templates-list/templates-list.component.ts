import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { TemplatesService } from '../../services/templates.service';
import { Template } from '../../interfaces/template';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../interfaces/task';
import { TemplateActions } from '../../enums/templateAction';

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

  @Output() private hideForm: EventEmitter<void> = new EventEmitter<void>();
  @Output() public showForm: EventEmitter<void> = new EventEmitter<void>();
  @Input() public action!: TemplateActions | null

  public showTemplatesForm() {
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
    this.hideForm.emit();
  }
  public chooseTemplateAction(template: Template) {
    if (this.action === TemplateActions.SaveAsTemplate) {
      console.log(template.tasks)
      this.templatesService?.updateTemplate(template);
    } else {
      this.insertFromTemplate(template);
    }
  }
  public deleteTemplate(templateToDelete: Template) {
    this.templatesService!.deleteTemplate(templateToDelete);
    this.hideForm.emit();
  }
}
