import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { courseBuyDetailAtom } from '../store/atoms/courseBuyDetail';
import Navbar from './courses/Navbar';
import SideBar from './courses/SideBar';
import { errorAtom, loadingAtom } from '../store/atoms/errorAndLoading';
import { buttonMsgAtom } from '../store/atoms/buttonMsg';
import axios from 'axios';

export const CourseDetail = () => {
  return (
    <div className="bg-bunker-950 flex flex-col min-h-screen mt-20">
      <Navbar />
      <SideBar />
      <MainCourseDetail />
    </div>
  );
};

export const MainCourseDetail = () => {
  const courseBuyDetail = useRecoilValue(courseBuyDetailAtom);
  const [error, setError] = useRecoilState(errorAtom);
  const [loading, setLoading] = useRecoilState(loadingAtom);
  const [buttonMsg, setButtonMsg] = useRecoilState(buttonMsgAtom);
  console.log(buttonMsg)
  const handleCoursePurchase = async (courseId) => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      setButtonMsg(null); // Reset button message

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated');
      }

      const response = await axios.post(
        `http://localhost:3000/api/user/courses/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setLoading(false);
        console.log('Course purchased successfully:', response.data);
        setButtonMsg('Purchased!');
      } else {
        console.log('Unexpected response status:', response.status);
        setButtonMsg(null);
      }
    } catch (error) {
      setLoading(false);
      setError(error);
      console.error('Error purchasing course:', error.response?.data || error.message);
    }
  };

  return (
    <div className="flex flex-col relative items-end ml-[12vh] m-2">
      {/* Main course detail */}
      <div className="transition-all duration-300 bg-waikawa-950 h-[30vh] p-4 rounded-xl flex items-center shadow-lg w-full">
        <p className="ml-20 font-aclonica text-transparent bg-clip-text bg-gradient-to-r from-waikawa-600 hidden lg:block via-red-200 to-waikawa-300 text-5xl">
          {courseBuyDetail?.title || 'Course Title'}
        </p>
      </div>

      {/* Course buy card */}
      <div className="flex flex-col mr-20 relative bg-waikawa-200 ml-[100vh] h-[50vh] rounded-xl w-[60vh] -translate-y-40 font-poppins">
        {/* Image Section */}
        <div className="h-[50%]">
          <img
            src={courseBuyDetail?.imageUrl || 'default-course.jpg'}
            alt="Course"
            className="h-full w-full object-cover rounded-t-xl"
          />
        </div>
        <div className="flex justify-between m-5 text-xl">
          <div>
            <p className="text-gray-500">Price</p>
            <p className="text-waikawa-800">₹{courseBuyDetail?.price || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-500">Course By:</p>
            <p>{courseBuyDetail?.courseBy || 'Unknown'}</p>
          </div>
        </div>
        <button
          onClick={() => {
                if(buttonMsg !== 'Purchased!' || buttonMsg !== 'View Details'){
                    handleCoursePurchase(courseBuyDetail?._id)
                }
            }}
          className="dark:bg-bunker-950 dark:text-waikawa-100 transition-all duration-300 px-6 w-[20vh] absolute top-[40vh] left-44 border hover:shadow-lg hover:shadow-red-300 hover:border-waikawa-600  p-2 rounded-xl"
        >
          {loading ? 'Buying...' : buttonMsg === 'View Details'?"Already Purchased!": buttonMsg === 'Purchased!'?"Purchased!": "Buy Now"}
        </button>
        {error && <p className="text-red-200 mt-2">{error.message || 'An error occurred'}</p>}
      </div>

      {/* Description Section */}
      <div className="absolute font-poppins top-[70vh] lg:top-[35vh] left-[5vh] w-[40vh] sm:w-[50vh] md:left-20 md:w-[80vh]">
        <div>
          <p className="text-3xl text-waikawa-200 border-b border-waikawa-600">Description:</p>
          <p className="text-xl text-waikawa-300 m-4 mt-6">
            {courseBuyDetail?.description || 'No description available.'}
          </p>
        </div>
      </div>
    </div>
  );
};
