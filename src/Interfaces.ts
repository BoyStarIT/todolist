export interface ITask {
  id: string;
  taskName: string;
  description?: string;
  dueDate: any;
  piority: "low" | "normal" | "high";
  checked?: boolean;
}
