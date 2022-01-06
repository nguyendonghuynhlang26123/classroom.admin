import { IUser } from '../users/users.interface';
import { IBase } from '../base';

export interface IStudentInfo {
  student_id: string;
  student_name: string;
  status: 'SYNCED' | 'NOT_SYNCED';
  user_id: IUser | undefined | null;
}
export interface ClassStudents extends IBase {
  class_id: string;
  file_location: string;
  students: IStudentInfo[];
}
