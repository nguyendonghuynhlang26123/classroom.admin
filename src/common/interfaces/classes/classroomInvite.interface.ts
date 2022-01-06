import { UserRole } from './classroomUser.interface';

export interface IInviteUserBody {
  class_id?: string;
  email: string;
  role: UserRole;
}

export interface IAcceptInviteUserBody {
  class_id: string;
  code: string;
  role: UserRole;
}
