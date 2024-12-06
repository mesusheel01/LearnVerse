import axios from 'axios';
import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { errorAtom } from '../../store/atoms/errorAndLoading';
import { useNavigate } from 'react-router-dom';
import { courseBuyDetailAtom } from '../../store/atoms/courseBuyDetail';

const CoursePageCard = ({ course }) => {
    const [error, setError] = useRecoilState(errorAtom)
    const setBuyCourseDetaill = useSetRecoilState(courseBuyDetailAtom)
    const navigate = useNavigate()



    async function handleCourseClick(courseId){
        try{
            const token = localStorage.getItem("token")
            if(!token){
                setError("Login To purchase!")
                return
            }
            const response = await axios.get(`http://localhost:3000/api/user/courses/${courseId}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data)
            if(!response.data || response.data.length === 0){
                setError("Login To purchase!")
            }else{
                setError(null)
                setBuyCourseDetaill(response.data.course)
                navigate(`/courses/${response.data.course?.title}`)
            }

        }catch(err){
            console.error(err);
        if (err.response) {
            setError(`Error: ${err.response.status} - ${err.response.data.message || 'Something went wrong'}`);
            } else if (err.request) {
                setError('Network error or no response from server.');
            } else {
                setError('An unexpected error occurred.');
            }
        }
    }

  return (
    <div key={course._id} className="mt-4 bg-white shadow-lg rounded-xl p-4 max-w-[300px] mx-2 border border-waikawa-600 flex flex-col transform transition duration-300  dark:bg-waikawa-900 dark:text-white">
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
          minHeight: '64px',
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
      <button onClick={()=>handleCourseClick(course._id)} className=' p-2 bg-waikawa-950 rounded-xl hover:bg-white transition-all duration-300 font-poppins hover:text-bunker-950 mt-2'>{error ? error: "Buy Course"}</button>
    </div>
  );
};

export default CoursePageCard;
