import { AppBreadcrumbs } from 'components';
import React from 'react';
import { Outlet } from 'react-router-dom';

const ClassroomManagement = () => {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};

export default ClassroomManagement;
