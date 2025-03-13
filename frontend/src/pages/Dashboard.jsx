import React from 'react';
import Navbar from '../components/Navbar';
import Balance from '../components/Balance';
import UserComponent from '../components/UserComponent';


const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <Balance />
      <UserComponent />
    </div>
  );
};

export default Dashboard;
