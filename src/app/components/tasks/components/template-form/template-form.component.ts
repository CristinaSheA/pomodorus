import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TemplatesService } from '../../services/templates.service';

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
  private readonly templatesService = inject(TemplatesService);
  private readonly fb = inject(FormBuilder);
  public templateForm: FormGroup = this.fb!.group({
    templateTitle: ['', [Validators.required, Validators.minLength(1)]],
  });

  public hideTemplateForm() {
    this.hideForm.emit();

    this.templateForm.reset({
      templateTitle: '',
    });
  }

  public createTemplate() {
    let templateTitleValue = this.templateForm.get('templateTitle')?.value;
    if (!this.templatesService) return;
    this.templatesService.createTemplate(templateTitleValue);
    this.hideTemplateForm();
  }
}
