import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TemplatesService } from '../../services/templates.service';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'template-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './template-form.component.html',
  styleUrl: './template-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateFormComponent {
  @Output() private hideForm: EventEmitter<void> = new EventEmitter<void>();
  public hideTemplateForm() {
    this.hideForm.emit()

    this.templateForm.reset({
      templateTitle: '',
    });
  }
  private templatesService = inject(TemplatesService)
  private tasksService = inject(TasksService)

  public templateForm: FormGroup = this.fb.group({
    templateTitle: ['', [Validators.required, Validators.minLength(1)]],
  });

  constructor(private fb: FormBuilder) {}


  public createTemplate() {
    const currentTasksList = this.tasksService?.tasksList()
    let templateTitleValue = this.templateForm.get('templateTitle')?.value;
    if (!currentTasksList) return
    if (!this.templatesService) return

    this.templatesService.createTemplate(currentTasksList, templateTitleValue)
    this.hideTemplateForm()
  }


}
