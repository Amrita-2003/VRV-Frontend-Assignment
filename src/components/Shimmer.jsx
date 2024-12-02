import React from 'react';

const Shimmer = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {[1, 2, 3].map((item) => (
        <div 
          key={item} 
          className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 
                     animate-pulse 
                     shadow-lg 
                     rounded-xl 
                     overflow-hidden 
                     border border-gray-200"
        >
          <div className="p-6">
            <div className="bg-gray-300 h-10 w-4/5 mb-4 rounded-md"></div>
            <div className="bg-gray-300 h-5 w-full rounded-md"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;