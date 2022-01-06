import { IBase } from './../base';
export interface IClassroom extends IBase {
  title: string;
  section: string;
  subject: string;
  room: string;
  image: string;
  code: string;
}

export interface IClassroomBody {
  title: string;
  section: string;
  subject?: string;
  room?: string;
}
