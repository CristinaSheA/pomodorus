import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sections',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sections.component.html',
  styleUrl: './sections.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionsComponent {
  @Input() public currentSection!: string;
  @Input() public sectionsList!: { name: string; time: number }[];
<<<<<<< HEAD
  @Output() private sectionMessage: EventEmitter<string> =
=======
  @Output() private methodFromChild: EventEmitter<string> =
>>>>>>> 2dfc00e20462808e63b63b384b1016fc201f7c19
    new EventEmitter<string>();

  public setSection(message: string): void {
    this.sectionMessage.emit(message);
  }
}
