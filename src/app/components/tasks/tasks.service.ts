import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { Task, TaskStatus } from './interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  public tasksList = signal<Task[]>([]);
  public selectedTask = signal<Task | null>(null);

  public selectTask(task: Task): void {
    this.tasksList.update((currentTasksList: Task[]) => {
      return currentTasksList.map((t) => ({ ...t, isSelected: false }));
    });
    this.selectedTask.update(() => {
      task.isSelected = true;
      return task;
    });

    this.tasksList.update((currentTasksList: Task[]) => {
      return currentTasksList.map((t) => (t.id === task.id ? task : t));
    });
  }

  public toggleTaskStatus(task: Task): void {
    task.status = task.status === TaskStatus.Done ? TaskStatus.NotDone : TaskStatus.Done;
  
    this.tasksList.update((currentTasksList: Task[]) => {
      return currentTasksList.map(t => t.id === task.id ? task : t);
    });
  }
  

  public createTask(
    title: string,
    description: string | undefined,
    totalPomodoros: number
  ): void {
    const newTask: Task = {
      id: Date.now(),
      title: '',
      description: 'description',
      isSelected: false,
      status: TaskStatus.NotDone,
      editMode: false,
      pomodoros: { totalPomodoros: 0, donePomodoros: 0 },
    };

    newTask.title = title;
    newTask.description = description;
    newTask.pomodoros.totalPomodoros = totalPomodoros;

    this.tasksList.update((currentTasksList: Task[]) => {
      return [...currentTasksList, newTask];
    });
  }

  public updateTask(): void {
    
  }

  public deleteTask(): void {}

  constructor() {}
}
