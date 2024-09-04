import React from 'react';
import { Outlet } from 'react-router-dom';
import FrontNavbar from './FrontNavbar';
import FrontFooter from './FrontFooter';

function FrontLayout() {
  return (
    <div className="bg-yellow-400">
      <FrontNavbar />
      <Outlet />
      <FrontFooter />
    </div>
  );
}

export default FrontLayout;
