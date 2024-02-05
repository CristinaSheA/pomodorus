import { Injectable } from '@angular/core';
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

  public pomodoroColorTheme: string = '';
  public shortBreakColorTheme: string = '';
  public longBreakColorTheme: string = '';
  public darkMode: boolean = false;

  updateState(newState: Partial<AppStateService>) {
    Object.assign(this, newState);
    localStorage.setItem('state', JSON.stringify(newState));
  }

  public get state() {
    return localStorage.getItem('state');
  }

  public toggleDarkMode(event: { target: { checked: any; }; }) {
    if ( event.target.checked ) {
      this.darkMode = true
    } else {
      this.darkMode = false
    }
  }

  public toggleAutoStartBreaks(event: { target: { checked: any; }; }) {
    if ( event.target.checked ) {
      this.autoStartBreaks = true
    } else {
      this.autoStartBreaks = false
    }
  }

  public toggleAutoStartPomodoros(event: { target: { checked: any; }; }) {
    if ( event.target.checked ) {
      this.autoStartPomodoros = true
    } else {
      this.autoStartPomodoros = false
    }
  }

  
  public toggleAutoCheckTasks(event: { target: { checked: any; }; }) {
    if ( event.target.checked ) {
      this.autoCheckTasks = true
    } else {
      this.autoCheckTasks = false
    }
  }

  public toggleAutoSwitchTasks(event: { target: { checked: any; }; }) {
    if ( event.target.checked ) {
      this.autoSwitchTasks = true
    } else {
      this.autoSwitchTasks = false
    }
  }


  



  

}
