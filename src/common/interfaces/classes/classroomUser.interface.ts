import { IUser } from './../users/users.interface';
export interface IClassroomUser {
  user_id: IUser;
  status: 'ACTIVATED' | 'INACTIVATED';
  role: UserRole;
  invite_code?: string;
}

export enum UserRole {
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN',
}
