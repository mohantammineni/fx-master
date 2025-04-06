import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function PaymentSuccess() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg py-28">
      <div className="flex justify-center items-center mb-4">
        <div className="w-44 h-44 bg-green-500 rounded-full flex items-center justify-center">
          <FaCheck className="text-white text-6xl" />
        </div>
      </div>

      {/* Payment in Processing */}
      <h1 className="text-green-500 text-3xl text-center mb-6 font-semibold">
        Payment in Processing
      </h1>

      {/* Go Back to Dashboard Button */}
      <div className="flex justify-center">
        <button onClick={handleClick} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
          Go Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccess;