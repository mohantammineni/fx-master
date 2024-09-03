import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
// import { FaSearch } from 'react-icons/fa';

const HeadingBarWithSearch = ({ title = '', fullName = '' }) => {
  return (
    <div className="flex items-center justify-between py-2 px-8 shadow-xl border-b">
      <div className="flex space-x-16 items-center">
        <Link to="/">
          <img src="/fx_logo.png" alt="FXMaster Logo" className="w-[100px] h-auto" />
        </Link>
        {/* <div className="relative">
          <input
            type="text"
            className="w-full bg-gray-200 rounded-3xl text-slate-900 py-2 px-4 pr-10 placeholder:text-sm placeholder:font-light placeholder:text-slate-900"
            placeholder="Search"
          />
          <FaSearch
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-900 font-light" />
        </div> */}
      </div>
      <span className="text-lg font-semibold">{title}</span>
      <div className="flex items-center gap-4">
        {/* <VscBellDot /> */}
        <span className="font-medium">{fullName}</span>
        <img
          className="w-8 h-8 rounded-full"
          src="https://avataaars.io/?avatarStyle=Circle&topType=Eyepatch&facialHairType=MoustacheFancy&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Wink&eyebrowType=Default&mouthType=Default&skinColor=Light"
        />
      </div>
    </div>
  );
};

HeadingBarWithSearch.propTypes = {
  title: PropTypes.string,
  fullName: PropTypes.string
};

export default HeadingBarWithSearch;
