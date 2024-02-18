import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, inject } from '@angular/core';
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
  @Output() hideColorThemeSelection = new EventEmitter()
  @Output() public update = new EventEmitter<void>();

  private appStateService = inject(AppStateService);
  public pickColor(color :string){
    this.appStateService!.pickColor(color)
    this.hideColorThemeSelection.emit()
    console.log('bef:',this.appStateService?.pomodoroColorTheme)
    console.log('bef:',this.appStateService?.shortBreakColorTheme)
    console.log('bef:',this.appStateService?.longBreakColorTheme)
    if (this.appStateService!.selectingColorThemePomodoro) {
      this.appStateService!.pomodoroColorTheme = color
    }
    if (this.appStateService!.selectingColorThemeBreak) {
      this.appStateService!.shortBreakColorTheme = color
    }
    if (this.appStateService!.selectingColorThemeLongBreak) {
      this.appStateService!.longBreakColorTheme = color
    }

    this.appStateService!.selectingColorThemePomodoro = false
    this.appStateService!.selectingColorThemeBreak = false
    this.appStateService!.selectingColorThemeLongBreak = false

    console.log('aft:',this.appStateService?.pomodoroColorTheme)
    console.log('aft:',this.appStateService?.shortBreakColorTheme)
    console.log('aft:',this.appStateService?.longBreakColorTheme)
  }
}
