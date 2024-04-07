import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public currentSection: WritableSignal<string> = signal('pomodoro');
}
