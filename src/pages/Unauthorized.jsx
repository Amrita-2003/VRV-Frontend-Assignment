import React from "react";

const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      <div className="text-center bg-white p-12 rounded-2xl shadow-2xl border border-gray-100 max-w-md w-full">
        <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl mb-6">
          🚫
        </div>
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600 mb-4">
          Access Denied
        </h2>
        <p className="text-gray-600 italic mb-4">
          "High Security Zone™ - Enter at Your Own Risk"
        </p>

        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-6">
          <p className="text-gray-700 font-semibold mb-2">Your Options:</p>
          <ul className="text-sm text-gray-600 space-y-2 text-left pl-4 list-disc">
            <li>Return to safety</li>
            <li>Verify your credentials</li>
            <li>Contact system administrator</li>
          </ul>
        </div>

        <button
          onClick={() => (window.location.href = "/")}
          className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 
                     text-white rounded-full hover:scale-105 
                     transition-transform duration-300 
                     shadow-lg hover:shadow-xl"
        >
          Return Home
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;