import { Reset } from "./enums"

export type UserType = {
  lastLogin: number;
  nextID: number;
  groupIDs: string[];
  groups: {[key: string]: TaskGroupType};
  lists: {[key: string]: TaskListType};
  tasks: {[key: string]: TaskType};
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