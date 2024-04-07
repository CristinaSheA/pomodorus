import { CommonModule, DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  effect,
  inject,
} from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { Section } from '../../interfaces/section';
import { TasksService } from '../../../tasks/services/tasks.service';
import { AppStateService } from '../../../../services/app-state.service';
import { AlarmSound } from '../../../../enums/alarmSound';
import { TickingSound } from '../../../../enums/tickingSound';
import { ConfigService } from '../../../../services/config.service';

@Component({
  selector: 'timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent {
  private readonly appStateService = inject(AppStateService);
  private readonly configService = inject(ConfigService);
  private readonly tasksService = inject(TasksService);
  private readonly cdr = inject(ChangeDetectorRef);

public currentSection!: string;
  @Input() public sectionsList!: Section[];
  @Input() public longBreakFrequency: number =
    this.appStateService!.longBreakInterval + 1;
  @Output() timerEnded = new EventEmitter<void>();
  @Output() setShowingButtons = new EventEmitter<void>();
  private currentPomodoroCount: number = 0;
  private tickingAudio = new Audio();
  public timer!: Subscription;
  public secondsLeft!: number;
  public min!: number;
  public sec!: number;

  private loggingEffect = effect(() => {
    let currentSection = this.configService!.currentSection()
    switch (currentSection) {
      case 'pomodoro':
        console.log(1, 'succesfull');
        this.getMinutes();
        this.updateTimerAndBackground(
          this.appStateService!.pomodoroMinutes(),
          this.appStateService!.pomodoroColorTheme
        );
        break;
      case 'short-break':
        console.log(2, 'succesfull');
        this.getMinutes();
        this.updateTimerAndBackground(
          this.appStateService!.shortBreakMinutes(),
          this.appStateService!.shortBreakColorTheme
        );
        break;
      case 'long-break':
        console.log(3, 'succesfull');
        this.getMinutes();
        this.updateTimerAndBackground(
          this.appStateService!.longBreakMinutes(),
          this.appStateService!.longBreakColorTheme
        );
        break;
    }

    console.log(this.currentSection);
    console.log(0);
    this.getMinutes();
  });

  constructor(@Inject(DOCUMENT) private document: Document) {}
  ngOnChanges(): void {
    this.themeBySection();
  }
  public startTimer(): void {
    let audio = new Audio();
    audio.src = '../../../../../assets/sounds/starting-timer.mp3';
    audio.play();

    this.timer = interval(1000).subscribe(() => {
      this.secondsLeft--;
      this.getMinutes();
      this.setTime()

      if (this.secondsLeft > 0) {
        this.secondsLeft--;
        this.getMinutes();
        this.setTime()
      } else {
        this.timer.unsubscribe();
        this.skipSection();
        this.timerEnded.emit();
        switch (this.appStateService?.alarmSound) {
          case AlarmSound.Bell:
            this.appStateService?.playAudio(
              '../../assets/sounds/alarm/bells.mp3',
              this.appStateService.alarmSoundRepetition
            );
            break;

          case AlarmSound.Bird:
            this.appStateService?.playAudio(
              '../../assets/sounds/alarm/birds.mp3',
              this.appStateService.alarmSoundRepetition
            );
            break;

          case AlarmSound.Digital:
            this.appStateService?.playAudio(
              '../../assets/sounds/alarm/digital.mp3',
              this.appStateService.alarmSoundRepetition
            );
            break;

          case AlarmSound.Kitchen:
            this.appStateService?.playAudio(
              '../../assets/sounds/alarm/kitchen.mp3',
              this.appStateService.alarmSoundRepetition
            );
            break;

          case AlarmSound.Wood:
            this.appStateService?.playAudio(
              '../../assets/sounds/alarm/pop.mp3',
              this.appStateService.alarmSoundRepetition
            );
            break;
        }
      }
    });
    this.startTicking();
    if (this.appStateService?.darkMode === true) {
      this.document.body.style.background = 'black';
    }
  }
  public startTicking() {
    this.tickingAudio.loop = true;

    switch (this.appStateService?.tickingSound) {
      case TickingSound.None:
        return;
      case TickingSound.TickingSlow:
        this.tickingAudio.src = '../../assets/sounds/ticking/ticking-slow.mp3';
        break;
      case TickingSound.TickingFast:
        this.tickingAudio.src = '../../assets/sounds/ticking/ticking-fast.mp3';
        break;
      case TickingSound.BrownNoise:
        this.tickingAudio.src = '../../assets/sounds/ticking/brown-noise.mp3';
        break;

      case TickingSound.WhiteNoise:
        this.tickingAudio.src = '../../assets/sounds/ticking/white-noise.mp3';
        break;
    }
    this.tickingAudio.play();
  }
  public pauseTimer(): void {
    this.timer.unsubscribe();
    this.themeBySection();
    this.tickingAudio.pause();
  }
  public themeBySection() {
    let currentSection = this.configService!.currentSection()
    switch (currentSection) {
      case 'pomodoro':
        this.document.body.style.background =
          this.appStateService!.pomodoroColorTheme;
        break;

      case 'short-break':
        this.document.body.style.background =
          this.appStateService!.shortBreakColorTheme;
        break;

      case 'long-break':
        this.document.body.style.background =
          this.appStateService!.longBreakColorTheme;
        break;
    }
  }
  public resumeTimer(): void {
    this.timer = interval(1000).subscribe(() => {
      if (this.secondsLeft > 0) {
        this.secondsLeft--;
        this.getMinutes();
      }
    });
    if (this.appStateService?.darkMode === true) {
      this.document.body.style.background = 'black';
    }
    this.startTicking();
  }
  public skipSection(): void {
    this.timer.unsubscribe();
    if (this.configService!.currentSection() === 'pomodoro') {
      this.currentPomodoroCount++;

      this.cdr?.detectChanges();
      this.incrementDonePomodoros();
      this.cdr?.detectChanges();
    }
    this.cdr?.detectChanges();

    if (this.configService!.currentSection() === 'pomodoro') {
      if (this.currentPomodoroCount % (this.appStateService!.longBreakInterval + 1) === 0) {
        this.configService!.currentSection.set('long-break');
      } else {
        this.configService!.currentSection.set('short-break');
      }
    } else {
      this.configService!.currentSection.set('pomodoro');
    }

    this.setTime();
    this.getMinutes();
    this.tickingAudio.pause();
    this.cdr?.detectChanges();

    if (
      this.appStateService?.autoStartPomodoros &&
      this.configService!.currentSection() === 'pomdoro'
    ) {
      this.startTimer();
    }
    if (
      this.appStateService?.autoStartBreaks &&
      this.configService!.currentSection() === 'short-break'
    ) {
      this.startTimer();
    }
  }
  public setTime(): void {
    let index = 0;
    let desiredTime = this.sectionsList[index].time;
    let minutes;
    let currentSection = this.configService!.currentSection()
    switch (currentSection) {
      case 'pomodoro':
        this.updateTimerAndBackground(
          this.appStateService!.pomodoroMinutes(),
          this.appStateService!.pomodoroColorTheme
        );
        index = 0;
        break;
      case 'short-break':
        this.updateTimerAndBackground(
          this.appStateService!.shortBreakMinutes(),
          this.appStateService!.shortBreakColorTheme
        );
        index = 1;
        break;
      case 'long-break':
        this.updateTimerAndBackground(
          this.appStateService!.longBreakMinutes(),
          this.appStateService!.longBreakColorTheme
        );
        index = 2;
        break;
    }

    desiredTime = this.sectionsList[index].time;
    minutes = desiredTime / 60;
  }
  public getMinutes(): void {
    let currentSection = this.configService!.currentSection()

    switch (currentSection) {
      case 'pomodoro':
        this.secondsLeft = this.appStateService!.pomodoroMinutes() * 60;
        break;

      case 'short-break':
        this.secondsLeft = this.appStateService!.shortBreakMinutes() * 60;
        break;

      case 'long-break':
        this.secondsLeft = this.appStateService!.longBreakMinutes() * 60;
        break;
    }
    const minutes = ~~(this.secondsLeft / 60);
    const sec = this.secondsLeft % 60;

    this.min = minutes;
    this.sec = sec;
    this.cdr?.detectChanges();
  }
  public updateTimerAndBackground(minutes: number, background: string): void {
    this.min = minutes;
    this.sec = 0;
    this.secondsLeft = minutes * 60;
    this.document.body.style.background = background;
  }
  private incrementDonePomodoros(): void {
    this.cdr?.detectChanges();
    this.tasksService?.selectedTask.update((task) => {
      if (!task) return null;
      task.pomodoros.donePomodoros++;
      return task;
    });
    this.cdr?.detectChanges();
    const selectedTask = this.tasksService?.selectedTask();
    if (
      selectedTask &&
      selectedTask.pomodoros.donePomodoros ===
        selectedTask.pomodoros.totalPomodoros
    ) {
      this.tasksService?.toggleTaskStatus(selectedTask);

      const tasks = this.tasksService!.tasksList();
      const currentIndex = tasks.findIndex((task) => task === selectedTask);
      const nextTask = tasks[currentIndex + 1];

      if (nextTask) {
        this.tasksService!.selectedTask.set(nextTask);
        nextTask.isSelected = true;
      } else {
        return;
      }
    }
  }
}
