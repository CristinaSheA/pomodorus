import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
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
  @Output() public setShowSettings = new EventEmitter<void>();

  private appStateService = inject(AppStateService);
  public pomodoroMinutes = this.appStateService!.pomodoroMinutes();
  public shortBreakMinutes = this.appStateService!.shortBreakMinutes();
  public longBreakMinutes = this.appStateService!.longBreakMinutes();
  public longBreakInterval = this.appStateService!.longBreakInterval + 1;
  public alarmSound: AlarmSound = this.appStateService!.alarmSound;
  public alarmSoundRepetition = this.appStateService!.alarmSoundRepetition;
  public tickingSound: TickingSound = this.appStateService!.tickingSound;
  public autoStartBreaks: boolean = this.appStateService!.autoStartBreaks;
  public autoStartPomodoros: boolean = this.appStateService!.autoStartPomodoros;
  public autoCheckTasks: boolean = this.appStateService!.autoCheckTasks;
  public autoSwitchTasks: boolean = this.appStateService!.autoSwitchTasks;
  public pomodoroColorTheme: string = this.appStateService!.pomodoroColorTheme;
  public shortBreakColorTheme: string =
    this.appStateService!.shortBreakColorTheme;
  public longBreakColorTheme: string =
    this.appStateService!.longBreakColorTheme;
  public darkMode: boolean = this.appStateService!.darkMode;

  public showColorThemeSelection: boolean = false;
  public selectingColorThemePomodoro: boolean = false;
  public selectingColorThemeBreak: boolean = false;
  public selectingColorThemeLongBreak: boolean = false;

  valueAlarmSelect!: string;
  valueTickingSelect!: string;

  

  ngOnInit() {
    const valueAlarmSelectFromLocalStorage = localStorage.getItem('valueAlarmSelect');
    if (!valueAlarmSelectFromLocalStorage) return;
    if (this.valueAlarmSelect = 'bird') {
      this.valueAlarmSelect = valueAlarmSelectFromLocalStorage;
      console.log(this.valueAlarmSelect);
    }
    const valueTickingSelectFromLocalStorage = localStorage.getItem('valueTickingSelect');
    if (!valueTickingSelectFromLocalStorage) return;
    if (this.valueTickingSelect = 'none') {
      this.valueTickingSelect = valueTickingSelectFromLocalStorage;
      console.log(this.valueTickingSelect);
    }

    this.pomodoroMinutes = this.appStateService!.pomodoroMinutes();
    this.shortBreakMinutes = this.appStateService!.shortBreakMinutes();
    this.longBreakMinutes = this.appStateService!.longBreakMinutes();
    this.longBreakInterval = this.appStateService!.longBreakInterval;
    this.alarmSound = this.appStateService!.alarmSound;
    this.alarmSoundRepetition = this.appStateService!.alarmSoundRepetition;
    this.tickingSound = this.appStateService!.tickingSound;
    this.autoStartBreaks = this.appStateService!.autoStartBreaks;
    this.autoStartPomodoros = this.appStateService!.autoStartPomodoros;
    this.autoCheckTasks = this.appStateService!.autoCheckTasks;
    this.autoSwitchTasks = this.appStateService!.autoSwitchTasks;
    this.pomodoroColorTheme = this.appStateService!.pomodoroColorTheme;
    this.shortBreakColorTheme = this.appStateService!.shortBreakColorTheme;
    this.longBreakColorTheme = this.appStateService!.longBreakColorTheme;
    this.darkMode = this.appStateService!.darkMode;
    this.selectingColorThemePomodoro =
      this.appStateService!.selectingColorThemePomodoro;
    this.selectingColorThemeBreak =
      this.appStateService!.selectingColorThemeBreak;
    this.selectingColorThemeLongBreak =
      this.appStateService!.selectingColorThemeLongBreak;
  }
  public onSelectAlarm(e: any) {
    this.appStateService?.onSelectAlarm(e);
  }
  public onSelectTicking(e: any) {
    this.appStateService?.onSelectTicking(e);
  }
  public setColorThemeSelection(value: boolean) {
    this.showColorThemeSelection = value;
  }
  public updateState() {
    this.alarmSound = this.appStateService!.alarmSound;
    this.tickingSound = this.appStateService!.tickingSound;
    const newState = {
      pomodoroMinutes: signal(this.pomodoroMinutes),
      shortBreakMinutes: signal(this.shortBreakMinutes),
      longBreakMinutes: signal(this.longBreakMinutes),
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

    localStorage.setItem('valueAlarmSelect', this.valueAlarmSelect);
    localStorage.setItem('valueTickingSelect', this.valueTickingSelect);

    this.appStateService?.updateState(newState);
    this.setShowSettings.emit();
  }
  public toggleDarkMode(event: any) {
    this.appStateService!.toggleDarkMode(event);
    this.darkMode = this.appStateService!.darkMode;
  }
  public toggleAutoStartBreaks(event: any) {
    this.appStateService!.toggleAutoStartBreaks(event);
    this.autoStartBreaks = this.appStateService!.autoStartBreaks;
  }
  public toggleAutoStartPomodoros(event: any) {
    this.appStateService!.toggleAutoStartPomodoros(event);
    this.autoStartPomodoros = this.appStateService!.autoStartPomodoros;
  }
  public toggleAutoCheckTasks(event: any) {
    this.appStateService!.toggleAutoCheckTasks(event);
    this.autoCheckTasks = this.appStateService!.autoCheckTasks;
  }
  public toggleAutoSwitchTasks(event: any) {
    this.appStateService!.toggleAutoSwitchTasks(event);
    this.autoSwitchTasks = this.appStateService!.autoSwitchTasks;
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
  public setThemeColor(value: string) {
    this.setColorThemeSelection(true);

    switch (value) {
      case 'pomodoro':
        this.appStateService!.selectingColorThemePomodoro = true;
        break;
      case 'short-break':
        this.appStateService!.selectingColorThemeBreak = true;
        break;
      case 'long-break':
        this.appStateService!.selectingColorThemeLongBreak = true;
        break;
    }
  }
  public get pomodoroTheme() {
    this.pomodoroColorTheme = this.appStateService!.pomodoroColorTheme;
    return this.appStateService!.pomodoroColorTheme;
  }
  public get shortBreakTheme() {
    this.shortBreakColorTheme = this.appStateService!.shortBreakColorTheme;
    return this.appStateService!.shortBreakColorTheme;
  }
  public get longBreakTheme() {
    this.longBreakColorTheme = this.appStateService!.longBreakColorTheme;
    return this.appStateService!.longBreakColorTheme;
  }
}
