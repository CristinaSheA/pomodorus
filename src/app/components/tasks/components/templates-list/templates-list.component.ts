import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { TemplatesService } from '../../services/templates.service';
import { Template } from '../../interfaces/template';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'templates-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './templates-list.component.html',
  styleUrl: './templates-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplatesListComponent {
  private readonly templatesService = inject(TemplatesService)
  private readonly tasksService = inject(TasksService)

  @Output() private hideList: EventEmitter<void> = new EventEmitter<void>();

  public templatesList() {
    return this.templatesService?.templatesList()
  }
  public insertFromTemplate(template: Template) {
    const tasksToAdd = template.tasks
    if (!this.tasksService) return
    this.tasksService.tasksList.update((currentTasksList: Task[]) => {
      return [...currentTasksList, ...tasksToAdd];
    })
    this.hideList.emit()
  }

  public deleteTemplate(templateToDelete: Template) {
    if (!this.templatesService) return
    this.templatesService.deleteTemplate(templateToDelete)
    this.hideList.emit()
  }
}
