import React from 'react';
import PropTypes from "prop-types";

function ChooseUs({heading="", content="", image = '/rect-choose-us-1.png' }) {
  return (
    <div className="flex-shrink-0 w-80 border border-blue-700 rounded-lg bg-blue-700 overflow-scroll">
      <img
        src={image}
        alt="Exchange Rate Image"
        className="w-full h-auto"
      />
      <div className="p-4 text-yellow-200">
        <h3 className="text-lg text-[#F5A647]">{heading}:</h3>
        <p className="pt-2 text-sm font-medium leading-relaxed">
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
};

export default ChooseUs;