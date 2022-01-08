import { IUser, IAdmin } from 'common/interfaces';
import { IBase } from './../base';

export interface IBlackList extends IBase {
  account: IUser;
  actor: IAdmin;
  reason: string;
  restored: boolean;
}
