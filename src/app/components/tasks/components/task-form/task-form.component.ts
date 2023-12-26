import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'task-form',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent { }
