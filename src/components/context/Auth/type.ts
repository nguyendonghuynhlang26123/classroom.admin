import { AuthData, IAdmin } from 'common/interfaces';

export type AuthProps = {
  signIn: (data: AuthData) => Promise<any>;
  register: (data: AuthData) => Promise<any>;
  logOut: () => void;
  reload: () => void;
  isAuthenticated: boolean;
  pending: boolean;
  userData: IAdmin | undefined;
};
