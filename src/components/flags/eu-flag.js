import React from 'react';
import PropTypes from 'prop-types';

const EuFlag = ({ width = 1250, height = 1250, className = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 10080 5040"
      className={className}
    >
      <defs>
        <g id="d">
          <g id="b">
            <path id="a" d="M0 0v1h.5z" transform="rotate(18 3.157 -.5)" />
            <use xlinkHref="#a" transform="scale(-1 1)" />
          </g>
          <g id="c">
            <use xlinkHref="#b" transform="rotate(72)" />
            <use xlinkHref="#b" transform="rotate(144)" />
          </g>
          <use xlinkHref="#c" transform="scale(-1 1)" />
        </g>
      </defs>
      <path fill="#039" d="M0 0h810v540H0z" />
      <g fill="#fc0" transform="matrix(30 0 0 30 405 270)">
        <use xlinkHref="#d" y="-6" />
        <use xlinkHref="#d" y="6" />
        <g id="e">
          <use xlinkHref="#d" x="-6" />
          <use xlinkHref="#d" transform="rotate(-144 -2.344 -2.11)" />
          <use xlinkHref="#d" transform="rotate(144 -2.11 -2.344)" />
          <use xlinkHref="#d" transform="rotate(72 -4.663 -2.076)" />
          <use xlinkHref="#d" transform="rotate(72 -5.076 .534)" />
        </g>
        <use xlinkHref="#e" transform="scale(-1 1)" />
      </g>
    </svg>
  );
};

EuFlag.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
};

export default EuFlag;