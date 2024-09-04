import React from 'react';
import PropTypes from 'prop-types';

function ChooseUs({
  heading = '',
  content = '',
  image = '/rect-choose-us-1.png',
  isCompact = false,
}) {
  return (
    <div
      className={`${isCompact ? 'w-80' : 'w-full'} flex-shrink-0 border border-custom-ultramarine-blue rounded-lg bg-custom-cobolt-blue overflow-scroll`}
    >
      <img src={image} alt="Exchange Rate Image" className="w-full h-auto" />
      <div className="p-4">
        <h3 className="text-lg text-custom-yellow font-openSans font-bold">
          {heading}:
        </h3>
        <p className="pt-2 text-sm font-medium leading-relaxed text-custom-maiza">
          {content}
        </p>
      </div>
    </div>
  );
}

ChooseUs.propTypes = {
  image: PropTypes.string,
  heading: PropTypes.string,
  content: PropTypes.string,
  isCompact: PropTypes.bool,
};

export default ChooseUs;
