import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { ColorThemeSelectorComponent } from './components/colorThemeSelector/colorThemeSelector.component';
import { AlarmSound } from '../../enums/alarmSound';
import { TickingSound } from '../../enums/tickingSound';
import { AppStateService } from '../../services/app-state.service';

@Component({
  selector: 'config',
  standalone: true,
  imports: [CommonModule, FormsModule, ColorThemeSelectorComponent],
  templateUrl: './config.component.html',
  styleUrl: './config.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigComponent {
  @Output() public setShowSettings = new EventEmitter<void>()

  private appStateService = inject(AppStateService);
  public pomodoroMinutes = this.appStateService!.pomodoroMinutes;
  public shortBreakMinutes = this.appStateService!.shortBreakMinutes;
  public longBreakMinutes = this.appStateService!.longBreakMinutes;
  public longBreakInterval = this.appStateService!.longBreakInterval;
  public alarmSound: AlarmSound = this.appStateService!.alarmSound;
  public alarmSoundRepetition = this.appStateService!.alarmSoundRepetition;
  public tickingSound: TickingSound = this.appStateService!.tickingSound;
  public autoStartBreaks: boolean = this.appStateService!.autoStartBreaks
  public autoStartPomodoros: boolean = this.appStateService!.autoStartPomodoros
  public autoCheckTasks: boolean = this.appStateService!.autoCheckTasks
  public autoSwitchTasks: boolean = this.appStateService!.autoSwitchTasks
  public pomodoroColorTheme: string = this.appStateService!.pomodoroColorTheme
  public shortBreakColorTheme: string = this.appStateService!.shortBreakColorTheme
  public longBreakColorTheme: string = this.appStateService!.longBreakColorTheme
  public darkMode: boolean = this.appStateService!.darkMode


  public showColorThemeSelection: boolean = false;
  public selectingColorThemePomodoro: boolean = false;
  public selectingColorThemeBreak: boolean = false;
  public selectingColorThemeLongBreak: boolean = false;

  ngOnInit() {
    // se parsea el resultado a un objeto
    const state = JSON.parse(localStorage.getItem('state') || '{}');
    this.pomodoroMinutes = state.pomodoroMinutes;
    this.shortBreakMinutes = state.shortBreakMinutes;
    this.longBreakMinutes = state.longBreakMinutes;
    this.longBreakInterval = state.longBreakInterval;
    this.alarmSoundRepetition = state.alarmSoundRepetition;
    this.showColorThemeSelection = state.showColorThemeSelection;
    this.selectingColorThemePomodoro = state.selectingColorThemePomodoro;
    this.selectingColorThemeBreak = state.selectingColorThemeBreak;
    this.selectingColorThemeLongBreak = state.selectingColorThemeLongBreak;
  }

  public updateState() {
    const newState = {
      pomodoroMinutes: this.pomodoroMinutes, 
      shortBreakMinutes: this.shortBreakMinutes, 
      longBreakMinutes: this.longBreakMinutes, 
      autoStartBreaks: this.autoStartBreaks, 
      autoStartPomodoros: this.autoStartPomodoros, 
      longBreakInterval: this.longBreakInterval, 
      autoCheckTasks: this.autoCheckTasks, 
      autoSwitchTasks: this.autoSwitchTasks, 
      alarmSound: this.alarmSound, 
      alarmSoundRepetition: this.alarmSoundRepetition, 
      tickingSound: this.tickingSound, 
      pomodoroColorTheme: this.pomodoroColorTheme, 
      shortBreakColorTheme: this.shortBreakColorTheme, 
      longBreakColorTheme: this.longBreakColorTheme, 
      darkMode: this.darkMode, 
    };

    this.appStateService?.updateState(newState);
    this.setShowSettings.emit()
    console.log(newState);
  }
  public toggleDarkMode(event: any) {
    this.appStateService!.toggleDarkMode(event);
    this.darkMode = this.appStateService!.darkMode
  }

  public toggleAutoStartBreaks(event: any) {
    this.appStateService!.toggleAutoStartBreaks(event);
    this.autoStartBreaks = this.appStateService!.autoStartBreaks
  }

  public toggleAutoStartPomodoros(event: any) {
    this.appStateService!.toggleAutoStartPomodoros(event);
    this.autoStartPomodoros = this.appStateService!.autoStartPomodoros
  }

  public toggleAutoCheckTasks(event: any) {
    this.appStateService!.toggleAutoCheckTasks(event);
    this.autoCheckTasks = this.appStateService!.autoCheckTasks
  }

  public toggleAutoSwitchTasks(event: any) {
    this.appStateService!.toggleAutoSwitchTasks(event);
    this.autoSwitchTasks = this.appStateService!.autoSwitchTasks
  }

  public autoCheckTasksMessage() {
    Swal.fire({
      title: 'Auto Check Tasks',
      text: "If you enable 'Auto Check Tasks', the active task will be automatically checked when the actual pomodoro count reaches the estimated count.",
      icon: 'info',
    });
  }
  public autoSwitchTasksMessage() {
    Swal.fire({
      title: 'Auto Switch Tasks',
      text: "If you enable 'Auto Switch Tasks', the checked task will be automatically moved to the bottom of the task list.",
      icon: 'info',
    });
  }
}
