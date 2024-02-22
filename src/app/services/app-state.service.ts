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
  public pomodoroColorTheme: string = 'rgb(186, 73, 73)';
  public shortBreakColorTheme: string = 'rgb(56, 133, 138)';
  public longBreakColorTheme: string = 'rgb(57, 112, 151)';
  public darkMode: boolean = false;
  public selectingColorThemePomodoro: boolean = false;
  public selectingColorThemeBreak: boolean = false;
  public selectingColorThemeLongBreak: boolean = false;

  public playAudio(src: string, times: number | null) {
    if (!times) return;
    const audio = new Audio();
    audio.src = src;
    for (let index = 0; index < times; index++) {
      let curCount = 0;
      audio.play();
      audio.onended = function () {
        curCount++;

        if (curCount === times) {
          audio.pause();
          audio.currentTime = 0;
        } else {
          audio.play();
        }
      };
    }
  }
  public onSelectAlarm(event: any) {
    const selectedValue = event.target.value;
    switch (selectedValue) {
      case 'bell':
        this.playAudio('../../assets/sounds/alarm/bells.mp3', 1);
        this.alarmSound = AlarmSound.Bell;
        console.log(this.alarmSound);

        break;

      case 'bird':
        console.log('bird');
        this.playAudio('../../assets/sounds/alarm/birds.mp3', 1);
        this.alarmSound = AlarmSound.Bird;
        console.log(this.alarmSound);

        break;

      case 'digital':
        console.log('digital');
        this.playAudio('../../assets/sounds/alarm/digital.mp3', 1);
        this.alarmSound = AlarmSound.Digital;
        console.log(this.alarmSound);

        break;

      case 'kitchen':
        console.log('kitchen');
        this.playAudio('../../assets/sounds/alarm/kitchen.mp3', 1);
        this.alarmSound = AlarmSound.Kitchen;
        console.log(this.alarmSound);

        break;

      case 'wood':
        this.playAudio('../../assets/sounds/alarm/pop.mp3', 1);
        this.alarmSound = AlarmSound.Wood;
        console.log('wood');
        console.log(this.alarmSound);
        break;
    }
  }
  public onSelectTicking(event: any) {
    const selectedValue = event.target.value;
    switch (selectedValue) {
      case 'none':
        this.tickingSound = TickingSound.None;
        break;
      case 'ticking-slow':
        this.tickingSound = TickingSound.TickingSlow;
        break;
      case 'ticking-fast':
        this.tickingSound = TickingSound.TickingFast;
        break;
      case 'brown-noise':
        this.tickingSound = TickingSound.BrownNoise;
        break;
      case 'white-noise':
        this.tickingSound = TickingSound.WhiteNoise;
        break;
    }
  }
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
    console.log(newState);
    console.log(this.alarmSound);
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
      this.pomodoroColorTheme = color;
    }
    if (this.selectingColorThemeBreak) {
      this.shortBreakColorTheme = color;
    }
    if (this.selectingColorThemeLongBreak) {
      this.longBreakColorTheme = color;
    }

    this.selectingColorThemePomodoro = false;
    this.selectingColorThemeBreak = false;
    this.selectingColorThemeLongBreak = false;
  }
}
