import React, { useEffect } from 'react';

const Error = () => {

  useEffect(()=>{
    document.title= 'Error 404'
  })
  
      return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      
      <h1 className="text-9xl font-extrabold text-red-700 animate-bounce">
        404
      </h1>

    
      <p className="mt-5 text-4xl font-bold text-gray-700 animate-fadeIn">
        Oops PH Team, wrong way! You ended up here 😅
      </p>

     
      <button
        className="mt-10 px-6 py-3 bg-red-600 text-white rounded-lg hover:scale-110 transform transition"
        onClick={() => window.location.href = "/"}
      >
        Go Back Home
      </button>
    </div>
  );
};

export default Error;