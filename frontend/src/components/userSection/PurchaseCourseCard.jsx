import React from 'react';

const PurchaseCourseCard = ({ course }) => {
  return (
    <div key={course._id} className="mt-4 bg-white shadow-lg border border-waikawa-600  rounded-xl p-4 max-w-[400px] mx-2 transform transition duration-300 flex flex-col  items-center dark:bg-waikawa-950 dark:text-white">
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
      {/* start or continue button */}
      <div >
        <button className='border p-2 rounded-xl hover:shadow-lg hover:shadow-purple-800 hover:bg-bunker-950 hover:p-3 transition-all duration-300'>
            Resume
        </button>
      </div>
    </div>
  );
};

export default PurchaseCourseCard;
