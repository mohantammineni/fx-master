import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { BsQuestion } from 'react-icons/bs';

const FrontNavbar = () => {
  const location = useLocation();
  return (
    <header className="sticky top-0 w-full flex flex-col md:flex-row items-center justify-between pl-12 pr-12 pt-2 pb-2 bg-white shadow-md z-50">
      {/* Logo */}
      <div className="flex items-center md:mb-0">
        <img src="/fx_logo.png" alt="FX Master Logo" className="h-10 mr-4" />
      </div>

      {/* Navigation */}
      <nav className="flex space-x-4 bg-custom-dark-blue py-2 px-4 rounded-full mb-2 md:mb-0">
        <NavLink
          to="/homepage"
          className={`${
            location.pathname === '/homepage'
              ? 'bg-yellow-400 text-black'
              : 'text-custom-yellow'
          } font-semibold py-2 px-4 rounded-full`}
        >
          Personal
        </NavLink>
        <NavLink
          to="/business"
          className={`${
            location.pathname === '/business'
              ? 'bg-yellow-400 text-black'
              : 'text-custom-yellow'
          } font-semibold py-2 px-4 rounded-full`}
        >
          Business
        </NavLink>
        <NavLink
          to="/fintech"
          className={`${
            location.pathname === '/fintech'
              ? 'bg-yellow-400 text-black'
              : 'text-custom-yellow'
          } font-semibold py-2 px-4 rounded-full`}
        >
          Fintech
        </NavLink>
      </nav>

      {/* Right Side */}
      <div className="flex items-center space-x-4">
        <a href="#" className="text-blue-600 flex items-center">
          <span className="mr-1 bg-custom-dark-blue text-white rounded-full h-6 w-6 flex items-center justify-center">
            ?
          </span>
          Help
        </a>
        <button className="bg-custom-dark-blue text-custom-yellow py-2 px-4 rounded-full">
          Sign-In
        </button>
        <button className="border border-blue-600 text-blue-600 py-2 px-4 rounded-full">
          Register
        </button>
        <div className="flex items-center space-x-1">
          <img
            src="https://flagcdn.com/gb.svg "
            alt="Flag"
            className="rounded-full h-6 w-6 object-cover"
          />
          <span className="text-blue-600">EN</span>
        </div>
      </div>
    </header>
  );
};

export default FrontNavbar;
