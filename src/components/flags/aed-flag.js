import React from 'react';
import PropTypes from 'prop-types';

const AedFlag = ({ width = 1250, height = 1250, className = '' }) => {
    className
    return (
        <svg width={width} height={height} className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600">
            <rect width="300" height="900" fill="#00732F" />
            <rect x="0" y="0" width="300" height="900" fill="#CE1126" />
            <rect x="300" y="0" width="900" height="300" fill="#00732F" />
            <rect x="300" y="300" width="900" height="300" fill="#ffffff" />
            <rect x="300" y="600" width="900" height="300" fill="#000000" />
        </svg>

    );
};

AedFlag.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    className: PropTypes.string,
};

export default AedFlag;