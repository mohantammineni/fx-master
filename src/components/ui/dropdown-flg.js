import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import PropTypes from 'prop-types';

const DropdownWithFlag = ({ selectedOption, options, handleSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative mx-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-3 bg-gray-200 rounded-2xl flex items-center justify-between"
      >
        <div className="flex items-center">
          <img src={selectedOption.flag} alt={selectedOption.name} className="w-6 h-4 mr-2" />
          <span>{selectedOption.name}</span>
        </div>
        <span className="pl-3">{isOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full bg-white shadow-lg rounded-lg mt-2">
          {options.map((option) => (
            <button
              key={option.code}
              onClick={() => {
                handleSelect(option);
                setIsOpen(false);
              }}
              className="w-full flex items-center px-4 py-2 text-left hover:bg-gray-100"
            >
              {
                option.flag &&
                <img src={option.flag} alt={option.name} className="w-6 h-4 mr-2" />
              }
              {option.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

DropdownWithFlag.propTypes = {
  selectedOption: PropTypes.shape({
    flag: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      flag: PropTypes.string,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleSelect: PropTypes.func.isRequired,
};

export default DropdownWithFlag;
