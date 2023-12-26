
export enum TaskStatus {
  Done = "DONE",
  NotDone = "NOT_DONE"
}


export interface Task {
  id: number;
  title: string;
  description: string;
  isSelected: boolean;
  status: TaskStatus;
  editMode: boolean;
  pomodoros: { totalPomodoros: number; donePomodoros: number };
}
