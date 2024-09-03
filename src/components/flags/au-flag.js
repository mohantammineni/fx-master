import React from 'react';
import PropTypes from 'prop-types';

const AuFlag = ({ width = 1200, height = 600, className = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 10080 5040"
      className={className}
    >
      <defs>
        <clipPath id="a">
          <path d="M0 0h6v3H0z" />
        </clipPath>
        <clipPath id="b">
          <path d="M0 0v1.5h6V3zm6 0H3v3H0z" />
        </clipPath>
        <path id="c"
              d="m0-360 69.421 215.845 212.038-80.301L155.99-35.603l194.985 115.71-225.881 19.651 31.105 224.59L0 160l-156.198 164.349 31.105-224.59-225.881-19.651 194.986-115.711-125.471-188.853 212.038 80.301z" />
        <path id="d"
              d="M0-210 54.86-75.508l144.862 10.614L88.765 28.842l34.67 141.052L0 93.334l-123.435 76.56 34.67-141.052-110.957-93.736L-54.86-75.508z" />
      </defs>
      <path fill="#012169" d="M0 0h10080v5040H0z" />
      <path d="m0 0 6 3m0-3L0 3" stroke="#fff" strokeWidth=".6" clipPath="url(#a)" transform="scale(840)" />
      <path d="m0 0 6 3m0-3L0 3" stroke="#e4002b" strokeWidth=".4" clipPath="url(#b)" transform="scale(840)" />
      <path d="M2520 0v2520M0 1260h5040" stroke="#fff" strokeWidth="840" />
      <path d="M2520 0v2520M0 1260h5040" stroke="#e4002b" strokeWidth="504" />
      <g fill="#fff">
        <use xlinkHref="#c" transform="matrix(2.1 0 0 2.1 2520 3780)" />
        <use xlinkHref="#c" x="7560" y="4200" />
        <use xlinkHref="#c" x="6300" y="2205" />
        <use xlinkHref="#c" x="7560" y="840" />
        <use xlinkHref="#c" x="8680" y="1869" />
        <use xlinkHref="#d" x="8064" y="2730" />
      </g>
    </svg>
  );
};

AuFlag.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
};

export default AuFlag;