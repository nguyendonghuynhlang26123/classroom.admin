import { AuthData, IAdmin, IUser } from 'common/interfaces';
import React from 'react';
import { repository } from 'services/repository';
import JwtAuthService from './jwt.service';
import { AuthProps } from './type';

const defaultValue: AuthProps = {
  signIn: () => new Promise(() => {}),
  register: () => new Promise(() => {}),
  logOut: () => {},
  reload: () => {},
  isAuthenticated: false,
  pending: true, //Auth in pending
  userData: undefined,
};

const AuthContext = React.createContext<AuthProps>(defaultValue);

export const AuthProvider = ({ children }: { children: any }) => {
  const [infor, setInfor] = React.useState<IAdmin | undefined>(undefined);
  const [isAuthen, setIsAuthen] = React.useState<boolean>(false);
  const [pending, setIsPending] = React.useState<boolean>(true);
  const jwtService = new JwtAuthService();

  const checkJWT = () => {
    jwtService.init(onAutoLogIn, onAutoLogOut);
  };

  React.useEffect(() => {
    repository.get('/', { withCredentials: true }); // Send get request to get CSRF token once site is visited.
    checkJWT();
  }, []);

  const onAutoLogIn = () => {
    jwtService
      .getUserData()
      .then((data: any) => {
        setIsAuthen(true);
        setIsPending(false); //Show that the api has been processed
        setInfor(data);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  const onAutoLogOut = () => {
    setIsAuthen(false);
    setIsPending(false); //Show that the api has been processed
    setInfor(undefined);
  };

  const logIn = (body: AuthData) => {
    return new Promise((resolve, reject) => {
      jwtService
        .logIn(body)
        .then((response: any) => {
          onAutoLogIn();
          resolve(response);
        })
        .catch((err) => reject(err));
    });
  };

  const register = (body: AuthData) => {
    return new Promise((resolve, reject) => {
      jwtService
        .register(body)
        .then(() => {
          onAutoLogIn();
          resolve(body);
        })
        .catch((res) => {
          reject(res);
        });
    });
  };

  const logOut = () => {
    setIsAuthen(false);
    return jwtService.logOut().then(onAutoLogOut);
  };

  const defaultProps: AuthProps = {
    ...defaultValue,
    signIn: logIn,
    register: register,
    logOut: logOut,
    reload: checkJWT,
    isAuthenticated: isAuthen,
    pending: pending,
    userData: infor,
  };

  return <AuthContext.Provider value={defaultProps}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
