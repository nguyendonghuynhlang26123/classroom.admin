import { RouteConfigs } from 'common/type';
import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import Utils from 'common/utils';
import { LinearProgress } from '@mui/material';

const MainLayout = React.lazy(() => import('./MainLayout'));
// main screen
const Dashboard = React.lazy(() => import('./Dashboard'));

const UserManagement = React.lazy(() => import('./Users'));
const UserList = React.lazy(() => import('./Users/children/UserList'));
const UserEdit = React.lazy(() => import('./Users/children/UserEdit'));

const AdminManagement = React.lazy(() => import('./Admins'));
const AdminList = React.lazy(() => import('./Admins/children/AdminList'));
const AdminEdit = React.lazy(() => import('./Admins/children/AdminEdit'));
const AdminCreate = React.lazy(() => import('./Admins/children/AdminCreate'));

const ClassroomManagement = React.lazy(() => import('./Classroom'));
const ClassroomList = React.lazy(() => import('./Classroom/children/ClassroomList'));
const ClassroomEdit = React.lazy(() => import('./Classroom/children/ClassroomEdit'));

const BlacklistManagement = React.lazy(() => import('./Blacklist'));

//Auth
const LoginPage = React.lazy(() => import('./Auth/Login'));

//Profile
const ProfilePage = React.lazy(() => import('./Profile'));

//Error pages
const NotFoundPage = React.lazy(() => import('./Errors/NotFound'));

// Public wrapper
const Wrapper = ({ children }: { children: any }) => <React.Suspense fallback={<LinearProgress />}>{children}</React.Suspense>;

// Authed wrapper
const AuthWrapped = ({ isAuthed, search = '', pathname = '' }: { isAuthed: boolean; search: string; pathname: string }) => {
  if (pathname === '/') {
    pathname = '';
    search = '';
  }
  return isAuthed ? (
    <Wrapper>
      <MainLayout />
    </Wrapper>
  ) : (
    <Navigate to={'/auth/login?redirect=' + encodeURIComponent(pathname + search)} />
  );
};

//External wrapper
const NotAuthWrapped = ({ isAuthed, search = '' }: { isAuthed: boolean; search: string }) => {
  const link = Utils.getParameterByName('redirect', search); // Redirect if needed
  return !isAuthed ? (
    <Wrapper>
      <Outlet />
    </Wrapper>
  ) : (
    <Navigate to={link ? link : '/'} />
  );
};

const appRoutes = (isAuthed: boolean, search: string, pathname: string): RouteConfigs => {
  const routes: RouteConfigs = [
    /// Authed routes
    {
      element: <AuthWrapped isAuthed={isAuthed} search={search} pathname={pathname} />, //Wrap by auth checking
      children: [
        {
          path: '/',
          index: true,
          element: <Dashboard />,
        },
        {
          path: '/user-account',
          element: <UserManagement />,
          children: [
            {
              index: true,
              element: <UserList />,
            },
            {
              path: 'edit/:userId',
              element: <UserEdit />,
            },
          ],
        },
        {
          path: '/admin-account',
          element: <AdminManagement />,
          children: [
            {
              index: true,
              element: <AdminList />,
            },
            {
              path: 'create',
              element: <AdminCreate />,
            },
            {
              path: 'edit/:adminId',
              element: <AdminEdit />,
            },
          ],
        },
        {
          path: '/classroom',
          element: <ClassroomManagement />,
          children: [
            {
              index: true,
              element: <ClassroomList />,
            },
            {
              path: 'edit/:adminId',
              element: <ClassroomEdit />,
            },
          ],
        },
        {
          path: '/blacklist',
          index: true,
          element: <BlacklistManagement />,
        },
        {
          path: '/profile',
          element: <ProfilePage />,
        },
      ],
    },

    //login routes
    { path: '/auth', element: <Navigate to="/auth/login" /> },
    {
      element: <NotAuthWrapped isAuthed={isAuthed} search={search} />, //Wrap by no auth checking
      children: [
        {
          path: '/auth/login',
          element: <LoginPage />,
        },
      ],
    },

    //Error handler
    {
      path: '/not-found',
      element: (
        <Wrapper>
          <NotFoundPage />
        </Wrapper>
      ),
    },
    {
      path: '/*',
      element: <Navigate to="/not-found" />,
    },
  ];

  return routes;
};

export default appRoutes;
