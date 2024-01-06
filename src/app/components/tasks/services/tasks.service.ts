import { Injectable, WritableSignal } from '@angular/core';
import { signal } from '@angular/core';
import { Task, TaskStatus } from '../interfaces/task';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  public selectedTask: WritableSignal<Task | null> = signal<Task | null>(null);
  public tasksList = signal<Task[]>([]);

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
    task.status =
      task.status === TaskStatus.Done ? TaskStatus.NotDone : TaskStatus.Done;

    this.tasksList.update((currentTasksList: Task[]) => {
      return currentTasksList.map((t) => (t.id === task.id ? task : t));
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
  public updateTask(
    title: string,
    description: string | undefined,
    totalPomodoros: number
  ): void {
    const tasks = this.tasksList();

    const taskInEditMode = tasks.find((task) => task.editMode);

    if (taskInEditMode) {
      const updatedTask: Task = {
        ...taskInEditMode,
        title: title,
        description: description,
        pomodoros: {
          totalPomodoros: totalPomodoros,
          donePomodoros: taskInEditMode.pomodoros.donePomodoros,
        },
      };

      this.tasksList.update((currentTasksList: Task[]) => {
        return currentTasksList.map((t) =>
          t.id === updatedTask.id ? updatedTask : t
        );
      });

      updatedTask.editMode = false;
    }
  }
  public deleteTask(taskToDelete: Task): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(81 138 88)',
      cancelButtonColor: 'rgb(186, 73, 73)',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.tasksList.update((currentTasksList: Task[]) => {
          return currentTasksList.filter((task) => task.id !== taskToDelete.id);
        });
      }
    });
  }
}
