import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { Task, TaskStatus } from './interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  
  public tasksList = signal<Task[]>([]);

  // - - [PropSignal] selectedTask

  selectTask(): void {}

  toggleTaskStatus(): void {
  }

  createTask(title: string, description: string | undefined , totalPomodoros: number): void {
    const newTask: Task = {
      id: Date.now(),
      title: title,
      description: description,
      isSelected: false,
      status: TaskStatus.NotDone,
      editMode: false,
      pomodoros: { totalPomodoros: totalPomodoros, donePomodoros: 0 },
    }
  
    this.tasksList.update((currentTasksList: Task[]) => {
      return [...currentTasksList, newTask];
    });
  }

  updateTask(): void {}

  deleteTask(): void {}

  constructor() {}

}



