import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import {courseAtom} from '../../store/atoms/courseFetch'
import PurchaseCourseCard from './PurchaseCourseCard'
import { errorAtom, loadingAtom } from '../../store/atoms/errorAndLoading'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const UserHero = () => {
    const [loading, setLoading] = useRecoilState(loadingAtom);
    const [errormsg, setErrormsg] = useRecoilState(errorAtom);
    const [username, setUsername] = useState("")
    const [modelCourse, setModelCourse] = useRecoilState(courseAtom);
    const fetchCourses = async ()=>{
        try {
            setLoading(true);
            const token = localStorage.getItem("token")
            const decode = jwtDecode(token)
            setUsername(decode.username)
            const [allCoursesRes, userPurchasesRes] = await Promise.all([
                axios.get('http://localhost:3000/api/courses'),
                axios.get(
                    `http://localhost:3000/api/user/purchasedCourses`,
                    {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    }
                )
            ]);

            const allCourses = allCoursesRes.data.courses || [];
            const userPurchases = userPurchasesRes.data.courses || [];
            const purchasedCourseIds = userPurchases.map((purchase) => purchase.courseId);
            const updatedCourses = allCourses.map(c =>({
                ...c,
                isPurchased: purchasedCourseIds.includes(c._id)
            }));
            const purchasedCourses = updatedCourses.filter(course => course.isPurchased);

            setModelCourse(purchasedCourses);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setErrormsg(err.message);
        }
    };

    useEffect(()=>{
        fetchCourses()
    },[])

  return (
    <div className='h-screen mt-20 relative'>
        {/* user welcome section */}
        <div>
            <p className='text-waikawa-300 text-3xl absolute  m-10 translate-x-20 font-aclonica'>Welcome {modelCourse.length === 0 ? "": "back!"} <span className='text-transparent bg-clip-text bg-gradient-to-r shadow-lg shadow-purple-900 p-2 rounded-xl from-waikawa-300 to-waikawa-600'>{username || "User"}</span> !</p>
        </div>
        {/* user courses section */}
        {/* Courses Section */}
        <div className="flex-grow p-4 ">
                {loading ? (
                    <div className="text-center  text-red-400">Loading...</div>
                ) : errormsg ? (
                    <div className="text-red-400 text-center">{errormsg}</div>
                ) : (
                    <div className="grid ml-20 sm:ml-20 absolute mt-32  md:ml-20 xl:ml-28 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                        {
                          modelCourse.length === 0?<div className='text-waikawa-200 text-xl '>
                            No courses available to show! Use Sidebar to go to courses section and purchase.
                          </div> : modelCourse.map((course) => (
                            <div key={course._id}>
                                <PurchaseCourseCard course={course}  />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className='flex justify-center text-waikawa-200 '>
                <button
                    onClick={fetchCourses}
                 className='mt-14 ml-10 hover:shadow-lg hover:shadow-purple-800  border transition-all duration-200 p-2 rounded-xl '>Refresh the database!</button>
            </div>
    </div>
  )
}

export default UserHero
