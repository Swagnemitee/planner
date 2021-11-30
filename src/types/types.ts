import { Reset } from "./enums"

export type UserType = {
  lastLogin: number;
  nextID: number;
  groupIDs: string[];
  groups: Map<string, TaskGroupType>;
  lists: Map<string, TaskListType>;
  tasks: Map<string, TaskType>;
}

export type TaskGroupType = {
  name: string;
  id: string;
  listIDs: string[];
}

export type TaskListType = {
  name: string;
  id: string;
  reset: Reset;
  taskIDs: string[];
}

export type TaskType = {
  name: string;
  id: string;
  done: number;
  count: number;
}