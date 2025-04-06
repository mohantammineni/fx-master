import React from 'react';
import PropTypes from 'prop-types';

const GBFlag = ({ width = 1200, height = 600, className = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 60 30"
      width={width}
      height={height}
      className={className}
    >
      <clipPath id="a">
        <path d="M0 0v30h60V0z" />
      </clipPath>
      <clipPath id="b">
        <path d="M30 15h30v15zv15H0zH0V0zV0h30z" />
      </clipPath>
      <g clipPath="url(#a)">
        <path d="M0 0v30h60V0z" fill="#012169" />
        <path
          d="m0 0 60 30m0-30L0 30"
          stroke="#fff"
          strokeWidth="6"
        />
        <path
          d="m0 0 60 30m0-30L0 30"
          clipPath="url(#b)"
          stroke="#C8102E"
          strokeWidth="4"
        />
        <path
          d="M30 0v30M0 15h60"
          stroke="#fff"
          strokeWidth="10"
        />
        <path
          d="M30 0v30M0 15h60"
          stroke="#C8102E"
          strokeWidth="6"
        />
      </g>
    </svg>
  );
};

GBFlag.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
};

export default GBFlag;
