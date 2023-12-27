import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { Task, TaskStatus } from './interfaces/task';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  
  public tasksList = signal<Task[]>([
    // {
    //   id: Date.now(),
    //   title: 'fjsajfksaf',
    //   description: 'hkkds',
    //   isSelected: false,
    //   status: TaskStatus.NotDone,
    //   editMode: false,
    //   pomodoros: { totalPomodoros: 10, donePomodoros: 1 },
    // },
  ]);

  // - - [PropSignal] selectedTask

  selectTask(): void {}

  toggleTaskStatus(): void {
  }

  createTask(): void {}

  updateTask(): void {}

  deleteTask(): void {}

  constructor() {}

}



