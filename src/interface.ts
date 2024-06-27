import { ReactNode } from "react";

export interface ITask {
  [x: string]: ReactNode;
  taskName: string;
  deadline: number;
  description: string;
}
export interface Option {
  value: string;
}
