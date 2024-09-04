import React from 'react';
import { Outlet } from 'react-router-dom';
import FrontNavbar from './FrontNavbar';

function FrontLayout() {
  return (
    <div className="bg-yellow-400">
      <FrontNavbar />
      <Outlet />
    </div>
  );
}

export default FrontLayout;