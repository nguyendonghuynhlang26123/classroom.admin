import React from 'react';
import { Navbar, useAuth, useLoading } from 'components';
import { IAdmin } from 'common/interfaces';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  const { userData } = useAuth();
  const [loading] = useLoading();

  return (
    <Navbar loading={loading} userData={userData as IAdmin}>
      <Outlet />
    </Navbar>
  );
};

export default MainLayout;
