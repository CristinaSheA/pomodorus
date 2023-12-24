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
  @Output() private sectionMessage: EventEmitter<string> =
    new EventEmitter<string>();

  public setSection(message: string): void {
    this.sectionMessage.emit(message);
  }
}
