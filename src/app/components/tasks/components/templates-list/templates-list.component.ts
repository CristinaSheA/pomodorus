import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { TemplatesService } from '../../services/templates.service';
import { Template } from '../../interfaces/template';

@Component({
  selector: 'templates-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './templates-list.component.html',
  styleUrl: './templates-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplatesListComponent {
  private templatesService = inject(TemplatesService)


  public get templatesList() {
    return this.templatesService?.templatesList()
  }
  public showTemplates() {}
  public insertFromTemplate() {}


  public deleteTemplate(templateToDelete: Template) {
    if (!this.templatesService) return
    this.templatesService.deleteTemplate(templateToDelete)
  }
}
