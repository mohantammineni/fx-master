import React from 'react';
import PropTypes from 'prop-types';

const InFlag = ({ width = 900, height = 600, className = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      height={height}
      viewBox="-45 -30 90 60"
      fill="#2C2C6F"
      className={className}
    >
      <path fill="#FFF" d="M-45-30h90v60h-90z"/>
      <path fill="#F15B25" d="M-45-30h90v20h-90z"/>
      <path fill="#006934" d="M-45 10h90v20h-90z"/>
      <circle r="9.25"/>
      <circle fill="#fff" r="8"/>
      <circle r="1.6"/>
      <g id="d">
        <g id="c">
          <g id="b">
            <g id="a">
              <path d="m0-8 .3 4.814L0-.802l-.3-2.384z"/>
              <circle transform="rotate(7.5)" r=".35" cy="-8"/>
            </g>
            <use xlinkHref="#a" transform="scale(-1)"/>
          </g>
          <use xlinkHref="#b" transform="rotate(15)"/>
        </g>
        <use xlinkHref="#c" transform="rotate(30)"/>
      </g>
      <use xlinkHref="#d" transform="rotate(60)"/>
      <use xlinkHref="#d" transform="rotate(120)"/>
    </svg>
  );
};

InFlag.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
};

export default InFlag;