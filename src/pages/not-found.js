import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">
        Oops! The page you are looking for does not exist.
      </p>
      <button onClick={() => navigate('/')} className="bg-[#205FFF] py-2 px-8 text-white rounded-3xl">
        Go to Homepage
      </button>
    </div>
  );
};

export default NotFound;
