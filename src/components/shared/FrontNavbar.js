import React from 'react';
import { Link } from 'react-router-dom';
// import { BsQuestion } from 'react-icons/bs';

const FrontNavbar = () => {
  return (
    <nav className="bg-white text-white shadow py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                className="h-auto w-[100px]"
                src="/fx_logo.png"
                alt="Logo"
              />
            </Link>
          </div>

          {/*<div className="hidden md:block bg-blue-700 rounded-4xl">*/}
          {/*  <div className="flex items-baseline space-x-4 py-2 px-3">*/}
          {/*    <Link to="#" className="text-slate-900 bg-yellow-400 px-3 py-2 rounded-4xl text-sm font-medium">*/}
          {/*      Personal*/}
          {/*    </Link>*/}
          {/*    <Link to="#" className="text-yellow-400 px-3 py-2 rounded-md text-sm font-medium">*/}
          {/*      Business*/}
          {/*    </Link>*/}
          {/*    <Link to="#" className="text-yellow-400 px-3 py-2 rounded-md text-sm font-medium">*/}
          {/*      Fintech*/}
          {/*    </Link>*/}
          {/*  </div>*/}
          {/*</div>*/}

          <div className="flex items-center space-x-4">
            {/* <Link to="#" className="text-blue-700 text-sm font-light py-2 px-4 rounded-4xl flex items-center gap-2">
              <BsQuestion className="bg-blue-600 rounded-full text-white text-lg" />
              Help
            </Link> */}
            <Link to="/login" className="bg-blue-700 text-yellow-400 text-sm font-normal py-2 px-4 rounded-4xl">
              Sign-in
            </Link>
            {/*<Link to="#" className="bg-white text-blue-700 text-sm font-light py-2 px-4 rounded-4xl border border-blue-700">*/}
            {/*  Register*/}
            {/*</Link>*/}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default FrontNavbar;
