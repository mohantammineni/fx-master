import React from "react";
import PropTypes from "prop-types";

export const PrimaryButton = ({ onClick, label, loading,style, isDisabled = false }) => {
  PrimaryButton.propTypes = {
    onClick: PropTypes.any,
    label: PropTypes.string,
    loading: PropTypes.bool,
    style: PropTypes.any,
    isDisabled: PropTypes.bool,
  };
  return (
    <>
      {loading ?
        <button
          className={`w-full text-white py-2 rounded-4xl text-sm ${
            isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-[#1152BE] hover:bg-blue-800"
          }`}
          disabled={isDisabled}
          style={style}
        >
          Please wait...
        </button>
        :
        <button
          className={`w-full text-white py-2 rounded-4xl text-sm ${
            isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-[#1152BE] hover:bg-blue-800"
          }`}
          onClick={onClick}
          disabled={isDisabled}
          style={style}
        >
          {label}
        </button>
      }
    </>
  )

}