import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  public pomodoroMinutes = 25
  public shortBreakMinutes = 5
  public longBreakMinutes = 15

  constructor() { }

}
