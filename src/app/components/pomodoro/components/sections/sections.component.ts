import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Section } from '../../interfaces/section';

@Component({
  selector: 'sections',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sections.component.html',
  styleUrl: './sections.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionsComponent {
  @Input() public sectionsList!: Section[];
  @Output() private setSection: EventEmitter<string> =
    new EventEmitter<string>();



  public onSetSection(message: string): void {
    this.setSection.emit(message);
  }
}
