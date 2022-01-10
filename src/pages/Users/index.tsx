import React from 'react';
import { Outlet } from 'react-router-dom';

const UserAccountManagement = () => {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};

export default UserAccountManagement;
