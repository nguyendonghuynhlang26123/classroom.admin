import { IClassroomUser } from 'common/interfaces';
import { IBase } from './../base';
export interface IClassroom extends IBase {
  title: string;
  section: string;
  subject: string;
  room: string;
  image: string;
  code: string;
  users: IClassroomUser[];
}

export interface IClassroomBody {
  title: string;
  section: string;
  subject?: string;
  room?: string;
}
