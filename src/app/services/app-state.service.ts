import {
  Inject,
  Injectable,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { AlarmSound } from '../enums/alarmSound';
import { TickingSound } from '../enums/tickingSound';
import { ConfigService } from './config.service';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  public readonly pomodoroMinutes: WritableSignal<number> = signal(25);
  public readonly shortBreakMinutes: WritableSignal<number> = signal(5);
  public readonly longBreakMinutes: WritableSignal<number> = signal(15);
  public autoStartBreaks: boolean = false;
  public autoStartPomodoros: boolean = false;
  public longBreakInterval: number = 3;
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
  public configService = inject(ConfigService);

  public lastValuea!: number;
  public lastValueb!: number;
  public lastValuec!: number;

  constructor(@Inject(DOCUMENT) private document: Document) {
    const pomodoroMinutesFromLocalStorage =
      localStorage.getItem('pomodoroMinutes');
    const shortBreakMinutesFromLocalStorage =
      localStorage.getItem('shortBreakMinutes');
    const longBreakMinutesFromLocalStorage =
      localStorage.getItem('longBreakMinutes');
    const autoStartBreaksFromLocalStorage =
      localStorage.getItem('autoStartBreaks');
    const autoStartPomodorosFromLocalStorage =
      localStorage.getItem('autoStartPomodoros');
    const longBreakIntervalFromLocalStorage =
      localStorage.getItem('longBreakInterval');
    const autoCheckTasksFromLocalStorage =
      localStorage.getItem('autoCheckTasks');
    const autoSwitchTasksFromLocalStorage =
      localStorage.getItem('autoSwitchTasks');
    const alarmSoundFromLocalStorage = localStorage.getItem('alarmSound');
    const alarmSoundRepetitionFromLocalStorage = localStorage.getItem(
      'alarmSoundRepetition'
    );
    const tickingSoundFromLocalStorage = localStorage.getItem('tickingSound');
    const pomodoroColorThemeFromLocalStorage =
      localStorage.getItem('pomodoroColorTheme');
    const shortBreakColorThemeFromLocalStorage = localStorage.getItem(
      'shortBreakColorTheme'
    );
    const longBreakColorThemeFromLocalStorage = localStorage.getItem(
      'longBreakColorTheme'
    );
    const darkModeFromLocalStorage = localStorage.getItem('darkMode');

    if (pomodoroMinutesFromLocalStorage) {
      this.pomodoroMinutes.set(JSON.parse(pomodoroMinutesFromLocalStorage));
    }
    if (shortBreakMinutesFromLocalStorage) {
      this.shortBreakMinutes.set(JSON.parse(shortBreakMinutesFromLocalStorage));
    }
    if (longBreakMinutesFromLocalStorage) {
      this.longBreakMinutes.set(JSON.parse(longBreakMinutesFromLocalStorage));
    }

    if (autoStartBreaksFromLocalStorage) {
      this.autoStartBreaks = JSON.parse(autoStartBreaksFromLocalStorage);
    }
    if (autoStartPomodorosFromLocalStorage) {
      this.autoStartPomodoros = JSON.parse(autoStartPomodorosFromLocalStorage);
    }
    if (longBreakIntervalFromLocalStorage) {
      this.longBreakInterval = JSON.parse(longBreakIntervalFromLocalStorage);
    }
    if (autoCheckTasksFromLocalStorage) {
      this.autoCheckTasks = JSON.parse(autoCheckTasksFromLocalStorage);
    }
    if (autoSwitchTasksFromLocalStorage) {
      this.autoSwitchTasks = JSON.parse(autoSwitchTasksFromLocalStorage);
    }
    if (alarmSoundFromLocalStorage) {
      this.alarmSound = JSON.parse(alarmSoundFromLocalStorage);
    }
    if (alarmSoundRepetitionFromLocalStorage) {
      this.alarmSoundRepetition = JSON.parse(
        alarmSoundRepetitionFromLocalStorage
      );
    }
    if (tickingSoundFromLocalStorage) {
      this.tickingSound = JSON.parse(tickingSoundFromLocalStorage);
    }
    if (pomodoroColorThemeFromLocalStorage) {
      this.pomodoroColorTheme = JSON.parse(pomodoroColorThemeFromLocalStorage);
    }
    if (shortBreakColorThemeFromLocalStorage) {
      this.shortBreakColorTheme = JSON.parse(
        shortBreakColorThemeFromLocalStorage
      );
    }
    if (longBreakColorThemeFromLocalStorage) {
      this.longBreakColorTheme = JSON.parse(
        longBreakColorThemeFromLocalStorage
      );
    }
    if (darkModeFromLocalStorage) {
      this.darkMode = JSON.parse(darkModeFromLocalStorage);
    }
  }

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
        break;

      case 'bird':
        this.playAudio('../../assets/sounds/alarm/birds.mp3', 1);
        this.alarmSound = AlarmSound.Bird;
        break;

      case 'digital':
        this.playAudio('../../assets/sounds/alarm/digital.mp3', 1);
        this.alarmSound = AlarmSound.Digital;
        break;

      case 'kitchen':
        this.playAudio('../../assets/sounds/alarm/kitchen.mp3', 1);
        this.alarmSound = AlarmSound.Kitchen;
        break;

      case 'wood':
        this.playAudio('../../assets/sounds/alarm/pop.mp3', 1);
        this.alarmSound = AlarmSound.Wood;
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
    if (
      !newState.longBreakMinutes ||
      !newState.pomodoroMinutes ||
      !newState.shortBreakMinutes
    )
      return;
    let newStatePomodoroMinutes = newState.pomodoroMinutes();
    this.pomodoroMinutes.update((value) => (value = newStatePomodoroMinutes));
    let newStateShortBreakMinutes = newState.shortBreakMinutes();
    this.shortBreakMinutes.update((value) => (value = newStateShortBreakMinutes));
    let newStateLongBreakMinutes = newState.longBreakMinutes();
    this.longBreakMinutes.update((value) => (value = newStateLongBreakMinutes));

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
    this.updateLocalStorage();

    switch (this.configService!.currentSection()) {
      case 'pomodoro':
        this.document.body.style.background = this.pomodoroColorTheme;
        break;
      case 'short-break':
        this.document.body.style.background = this.shortBreakColorTheme;
        break;
      case 'long-break':
        this.document.body.style.background = this.longBreakColorTheme;
        break;
    }
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
  private updateLocalStorage() {
    localStorage.setItem(
      'pomodoroMinutes',
      JSON.stringify(this.pomodoroMinutes())
    );
    localStorage.setItem(
      'shortBreakMinutes',
      JSON.stringify(this.shortBreakMinutes())
    );
    localStorage.setItem(
      'longBreakMinutes',
      JSON.stringify(this.longBreakMinutes())
    );
    localStorage.setItem(
      'autoStartBreaks',
      JSON.stringify(this.autoStartBreaks)
    );
    localStorage.setItem(
      'autoStartPomodoros',
      JSON.stringify(this.autoStartPomodoros)
    );
    localStorage.setItem(
      'longBreakInterval',
      JSON.stringify(this.longBreakInterval)
    );
    localStorage.setItem('autoCheckTasks', JSON.stringify(this.autoCheckTasks));
    localStorage.setItem(
      'autoSwitchTasks',
      JSON.stringify(this.autoSwitchTasks)
    );
    localStorage.setItem('alarmSound', JSON.stringify(this.alarmSound));
    localStorage.setItem(
      'alarmSoundRepetition',
      JSON.stringify(this.alarmSoundRepetition)
    );
    localStorage.setItem('tickingSound', JSON.stringify(this.tickingSound));
    localStorage.setItem(
      'pomodoroColorTheme',
      JSON.stringify(this.pomodoroColorTheme)
    );
    localStorage.setItem(
      'shortBreakColorTheme',
      JSON.stringify(this.shortBreakColorTheme)
    );
    localStorage.setItem(
      'longBreakColorTheme',
      JSON.stringify(this.longBreakColorTheme)
    );
    localStorage.setItem('darkMode', JSON.stringify(this.darkMode));
  }
}
