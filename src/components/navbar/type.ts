import { IUser } from 'common/interfaces';

export type NavbarProps = {
  loading: boolean;
  children: React.ReactElement | React.ReactElement[];
  userData: IUser;
};
