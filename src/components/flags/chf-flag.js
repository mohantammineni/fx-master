import React from 'react';
import PropTypes from 'prop-types';

const ChfFlag = ({ width = 1250, height = 1250, className = '' }) => {
    className
    return (
        

<svg width={width} height={height} className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600">
<rect fill="red" width="900" height="900"/>
<rect x="100" y="300" fill="#FEFEFE" width="700" height="300"/>
<rect x="300" y="100" fill="#FEFEFE" width="300" height="700"/>
</svg>

    );
};

ChfFlag.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    className: PropTypes.string,
};

export default ChfFlag;