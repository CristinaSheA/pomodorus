import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sections',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './sections.component.html',
  styleUrl: './sections.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionsComponent {
  @Input() currentSection!: string
  @Output() setSection!: EventEmitter<string>

  @Output() methodFromChild = new EventEmitter<string>();

  childMethod(a: string) {
    // Aquí va la lógica del método del componente hijo
    this.methodFromChild.emit(a);
  }
}
