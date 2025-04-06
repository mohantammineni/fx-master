import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const HeadingBarWithSearch = ({ fullName, isSidebarOpen, setSidebarOpen }) => {
  return (
    <div className="flex flex-wrap items-center justify-between py-2 px-4 md:px-8 shadow-lg border-b bg-white w-full">
      {/* Logo */}
      <div className="flex items-center space-x-4">
        <Link to="/">
          <img
            src="/fx_logo.png"
            alt="Logo"
            className="w-[140px] h-auto"
          />
        </Link>
      </div>

      {/* <div className="relative">
          <input
            type="text"
            className="w-full bg-gray-200 rounded-3xl text-slate-900 py-2 px-4 pr-10 placeholder:text-sm placeholder:font-light placeholder:text-slate-900"
            placeholder="Search"
          />
          <FaSearch
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-900 font-light" />
        </div> */}

      {/* Right Section: User Info and Hamburger */}
      <div className="flex items-center gap-4">
        {/* User Info */}
        <span className="text-sm font-medium">{fullName}</span>
        <img
          className="w-8 h-8 rounded-full"
          src="https://avataaars.io/?avatarStyle=Circle"
          alt="User Avatar"
        />
        {/* Hamburger Icon */}
        <button
          className="sm:hidden text-2xl"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "✕" : "☰"} {/* Change icon dynamically */}
        </button>
      </div>
    </div>
  );
};

HeadingBarWithSearch.propTypes = {
  fullName: PropTypes.string,
  isSidebarOpen: PropTypes.bool.isRequired,
  setSidebarOpen: PropTypes.func.isRequired,
};

export default HeadingBarWithSearch;
