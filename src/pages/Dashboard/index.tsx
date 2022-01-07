import { useAuth, useLoading } from 'components';
import React from 'react';

const Dashboard = () => {
  const { userData } = useAuth();
  const [loading] = useLoading();

  return <p>123</p>;
};

export default Dashboard;
