import {
  Injectable,
} from '@angular/core';
import { AlarmSound } from '../enums/alarmSound';
import { TickingSound } from '../enums/tickingSound';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  public pomodoroMinutes: number = 25;
  public shortBreakMinutes: number = 5;
  public longBreakMinutes: number = 15;
  public autoStartBreaks: boolean = false;
  public autoStartPomodoros: boolean = false;
  public longBreakInterval: number = 1;

  public autoCheckTasks: boolean = false;
  public autoSwitchTasks: boolean = false;

  public alarmSound: AlarmSound = AlarmSound.Bell;
  public alarmSoundRepetition: number = 1;
  public tickingSound: TickingSound = TickingSound.None;

  public pomodoroColorTheme: string = 'rgb(186, 73, 73)';
  public shortBreakColorTheme: string = 'rgb(56, 133, 138)';
  public longBreakColorTheme: string = 'rgb(57, 112, 151)';
  public darkMode: boolean = false;

  public selectingColorThemePomodoro: boolean = false;
  public selectingColorThemeBreak: boolean = false;
  public selectingColorThemeLongBreak: boolean = false;



  public updateState(newState: Partial<AppStateService>) {
    Object.assign(this, newState);
    this.pomodoroMinutes = newState?.pomodoroMinutes ?? 0;
    this.shortBreakMinutes = newState?.shortBreakMinutes ?? 0;
    this.longBreakMinutes = newState?.longBreakMinutes ?? 0;
    this.autoStartBreaks = newState?.autoStartBreaks ?? false;
    this.autoStartPomodoros = newState?.autoStartPomodoros ?? false;
    this.longBreakInterval = newState?.longBreakInterval ?? 0;
    this.autoCheckTasks = newState?.autoCheckTasks ?? false;
    this.autoSwitchTasks = newState?.autoSwitchTasks ?? false;
    this.alarmSound = newState?.alarmSound ?? AlarmSound.Bell;
    this.alarmSoundRepetition = newState?.alarmSoundRepetition ?? 0;
    this.tickingSound = newState?.tickingSound ?? TickingSound.None;
    this.pomodoroColorTheme = newState?.pomodoroColorTheme ?? '';
    this.shortBreakColorTheme = newState?.shortBreakColorTheme ?? '';
    this.longBreakColorTheme = newState?.longBreakColorTheme ?? '';
    this.darkMode = newState?.darkMode ?? false;
  }
  public toggleDarkMode(event: { target: { checked: any } }) {
    if (event.target.checked) {
      this.darkMode = true;
    } else {
      this.darkMode = false;
    }
  }
  public toggleAutoStartBreaks(event: { target: { checked: any } }) {
    if (event.target.checked) {
      this.autoStartBreaks = true;
    } else {
      this.autoStartBreaks = false;
    }
  }
  public toggleAutoStartPomodoros(event: { target: { checked: any } }) {
    if (event.target.checked) {
      this.autoStartPomodoros = true;
    } else {
      this.autoStartPomodoros = false;
    }
  }
  public toggleAutoCheckTasks(event: { target: { checked: any } }) {
    if (event.target.checked) {
      this.autoCheckTasks = true;
    } else {
      this.autoCheckTasks = false;
    }
  }
  public toggleAutoSwitchTasks(event: { target: { checked: any } }) {
    if (event.target.checked) {
      this.autoSwitchTasks = true;
    } else {
      this.autoSwitchTasks = false;
    }
  }
  public pickColor(color: string) {
    if (this.selectingColorThemePomodoro) {
      this.pomodoroColorTheme = color
    }
    if (this.selectingColorThemeBreak) {
      this.shortBreakColorTheme = color
    }
    if (this.selectingColorThemeLongBreak) {
      this.longBreakColorTheme = color
    }

    this.selectingColorThemePomodoro = false
    this.selectingColorThemeBreak = false
    this.selectingColorThemeLongBreak = false
  }
}
