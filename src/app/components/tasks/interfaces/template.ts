import { Task } from "./task";

export interface Template { 
  id: number;
  title: string;
  tasks: Task[]
}
