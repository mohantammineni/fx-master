import React from 'react';
import PropTypes from 'prop-types';

function Services({ title = '', content = '', image = '' }) {
  return (
    <div className="flex-shrink-0 w-72 text-center border border-blue-700 rounded-lg bg-white overflow-hidden">
      <div className="flex justify-center items-center w-full h-32 mt-5">
        <img src={image} alt="Exchange Rate Image" className="w-32 h-32" />
      </div>
      <div className="p-4">
        <h3 className="text-sm text-black font-openSans font-bold">{title}</h3>
        <p className="pt-2 text-[11px] font-medium leading-relaxed text-black">
          {content}
        </p>
      </div>
    </div>
  );
}

Services.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  image: PropTypes.string,
};

export default Services;
