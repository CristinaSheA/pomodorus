import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AppStateService } from '../../../../services/app-state.service';

@Component({
  selector: 'color-theme-selector',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './colorThemeSelector.component.html',
  styleUrl: './colorThemeSelector.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorThemeSelectorComponent { 
  private appStateService = inject(AppStateService);
  pickColor(fsa:string){}
}
