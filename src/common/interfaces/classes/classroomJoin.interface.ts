import { UserRole } from './classroomUser.interface';

export interface IJoinClassBody {
  class_id?: string;
  role: UserRole;
  code: string;
}
