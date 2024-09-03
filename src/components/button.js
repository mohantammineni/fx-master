import React from "react";
import PropTypes from "prop-types";

export const PrimaryButton = ({ onClick, label, loading }) => {
  PrimaryButton.propTypes = {
    onClick: PropTypes.any,
    label: PropTypes.string,
    loading: PropTypes.bool
  };
  return (
    <>
      {loading ?
        <button
          className="w-full bg-blue-900 text-white py-2 rounded-4xl text-sm"
        >
          Please wait...
        </button>
        :
        <button
          className="w-full bg-[#1152BE] text-white py-2 rounded-4xl text-sm"
          onClick={onClick}
        >
          {label}
        </button>
      }
    </>
  )

}