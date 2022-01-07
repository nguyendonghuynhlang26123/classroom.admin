import { IBase } from './../base';

export interface IAdmin extends IBase {
  email: string;
  name: string;
  avatar: string;
  is_root: boolean;
}
