import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SectionService {
  public currentSection: string = 'pomodoro';
}
