import { AuthData, IUser } from 'common/interfaces';

export type AuthProps = {
  signIn: (data: AuthData) => Promise<any>;
  register: (data: AuthData) => Promise<any>;
  logOut: () => void;
  reload: () => void;
  isAuthenticated: boolean;
  pending: boolean;
  userData: IUser | undefined;
};
