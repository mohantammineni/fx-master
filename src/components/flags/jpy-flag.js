import React from 'react';
import PropTypes from 'prop-types';

const JpyFlag = ({ width = 900, height = 600, className = '' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 64 64"
      className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img"  preserveAspectRatio="xMidYMid meet">
      <path d="m0 0 6 3m0-3L0 3" stroke="#fff" strokeWidth=".6" clipPath="url(#a)" transform="scale(840)" />
      <circle cx="32" cy="32" r="12" fill="#ed4c5c"></circle>
    </svg>
  );
};

JpyFlag.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
};

export default JpyFlag;