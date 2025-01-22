export interface ITask {
  id: string;
  isCompleted: boolean;
  task: string;
}

export type TypeTodos = ITask[];

export type Filter = "All" | "Active" | "Completed";
