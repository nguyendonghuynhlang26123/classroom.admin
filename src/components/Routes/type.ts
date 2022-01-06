export type PrivateRoutesProps = {
  children: JSX.Element;
  redirect: string;
  isAuthenticated: boolean;
  [k: string]: any; //Others ...
};
