import { IBase } from '../base';
export interface IAssignment extends IBase {
  class_id: string;
  ui_index: number;
  title: string;
  instructions: string;
  total_points: number;
  due_date: number;
}

export interface IAssignmentBody {
  class_id: string;
  title: string;
  instructions: string;
  total_points: number;
  due_date?: number;
  ui_index?: number;
}
