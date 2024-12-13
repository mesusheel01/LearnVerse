import React from 'react';

const PurchaseCourseCard = ({ course }) => {
  return (
    <div key={course._id} className="inline-block mt-4 bg-white shadow-md rounded-xl p-4 max-w-[300px] mx-2 transform transition duration-300 hover:-translate-y-4 dark:bg-waikawa-900 dark:text-white">
      <div className="w-full h-32 bg-gray-200 rounded-t-md overflow-hidden">
        <img
          src={course?.imageUrl}
          alt={course?.title}
          className="w-full h-full object-cover"
        />
      </div>


      <h3
        className="text-xl dark:text-waikawa-400 font-bold mt-4"
        style={{
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          whiteSpace: 'normal',
          minHeight: '48px',
        }}
      >
        {course?.title}
      </h3>

      <p
        className="mt-2 dark:text-waikawa-200 text-sm text-gray-700"
        style={{
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          whiteSpace: 'normal',
          minHeight: '64px', // Ensure description has a consistent height
        }}
      >
        {course?.description}
      </p>

      <div className="mt-4 flex justify-between items-center">
        <p className="text-lg font-semibold text-green-600">
          ₹{course?.price}
        </p>
        <p className="text-sm text-gray-500">
          By: {course?.courseBy}
        </p>
      </div>
    </div>
  );
};

export default PurchaseCourseCard;
