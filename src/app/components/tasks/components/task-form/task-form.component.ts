import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { FormGroup } from '@angular/forms';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'task-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent {
  @Output() public hideForm: EventEmitter<void> = new EventEmitter<void>();
  @Output() public showStats: EventEmitter<void> = new EventEmitter<void>();
  @Input() public task!: Task;

  private readonly fb = inject(FormBuilder);
  public readonly tasksService = inject(TasksService);
  public showDescriptionField: boolean = false;
  public showSaveButton: boolean = true;
  public taskForm: FormGroup = this.fb!.group({
    taskTitle: ['', [Validators.required, Validators.minLength(1)]],
    taskPomodoros: [1, [Validators.required, Validators.min(1)]],
    taskDescription: [''],
  });


  ngOnInit(): void {
    if (this.task?.editMode) {
      this.showSaveButton = false;
      this.taskForm = this.fb!.group({
        taskTitle: [
          this.task.title,
          [Validators.required, Validators.minLength(1)],
        ],
        taskPomodoros: [
          this.task.pomodoros.totalPomodoros,
          [Validators.required, Validators.min(1)],
        ],
        taskDescription: [this.task.description],
      });
      if (this.task.description !== '') {
        this.showDescriptionField = true;
      }
    }
  }

  public hideTaskForm(): void {
    this.hideForm.emit();

    this.taskForm.reset({
      taskTitle: '',
      taskPomodoros: 1,
      taskDescription: '',
    });

    if (this.task?.editMode) {
      this.task.editMode = false;
    }
  }

  public createTask(): void {
    let taskTitleValue = this.taskForm.get('taskTitle')?.value;
    let taskPomodorosValue = this.taskForm.get('taskPomodoros')?.value;
    let taskDescriptionValue = this.taskForm.get('taskDescription')?.value;

    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched;
      return;
    }

    this.tasksService?.createTask(
      taskTitleValue,
      taskDescriptionValue,
      taskPomodorosValue
    );

    this.showStats.emit()
    this.hideTaskForm();
  }

  public updateTask(): void {
    let taskTitleValue = this.taskForm.get('taskTitle')?.value;
    let taskPomodorosValue = this.taskForm.get('taskPomodoros')?.value;
    let taskDescriptionValue = this.taskForm.get('taskDescription')?.value;

    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched;
      return;
    }

    this.tasksService?.updateTask(
      taskTitleValue,
      taskDescriptionValue,
      taskPomodorosValue
    );
  }

  public onShowDescriptionField(): void {
    this.showDescriptionField = true;
  }

  public isValidField(field: string): boolean | null {
    return (
      this.taskForm.controls[field].errors &&
      this.taskForm.controls[field].touched
    );
  }
}
