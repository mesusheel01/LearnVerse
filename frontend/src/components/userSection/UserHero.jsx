import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import {purchasesAtom} from '../../store/atoms/purchaseCourse'
import {courseAtom} from '../../store/atoms/courseFetch'
import PurchaseCourseCard from './PurchaseCourseCard'
import { errorAtom, loadingAtom } from '../../store/atoms/errorAndLoading'
import axios from 'axios'

const UserHero = () => {
    const [loading, setLoading] = useRecoilState(loadingAtom);
    const [errormsg, setErrormsg] = useRecoilState(errorAtom);
    const [modelCourse, setModelCourse] = useRecoilState(courseAtom);
    const [purchaseModel, setPurchaseModel] = useRecoilState(purchasesAtom);
    const fetchCourses = async ()=>{
        try {
            setLoading(true);
            const token = localStorage.getItem("token")
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
            console.log("purchase ids: ",purchasedCourseIds)

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
    <div className='min-h-screen mt-20 relative'>
        {/* user welcome section */}
        <div>
            <p className='text-waikawa-300 text-3xl absolute  m-10 translate-x-20 font-aclonica'>Welcome back! username</p>
        </div>
        {/* user courses section */}
        {/* Courses Section */}
        <div className="flex-grow p-4 absolute mt-20 ml-10">
                {loading ? (
                    <div className="text-center text-red-400">Loading...</div>
                ) : errormsg ? (
                    <div className="text-red-400 text-center">{errormsg}</div>
                ) : (
                    <div className="grid ml-12 md:ml-5 lg:ml-10 xl:ml-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                        {modelCourse.map((course) => (
                            <div key={course._id}>
                                <PurchaseCourseCard course={course}  />
                            </div>
                        ))}
                    </div>
                )}
            </div>
    </div>
  )
}

export default UserHero
