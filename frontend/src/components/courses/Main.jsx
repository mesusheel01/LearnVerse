import React, { useEffect } from 'react';
import { courseAtom } from '../../store/atoms/courseFetch';
import { errorAtom, loadingAtom } from '../../store/atoms/errorAndLoading';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import CoursePageCard from './CoursePageCard';
import SideBar from './SideBar';

const Main = () => {
    const [loading, setLoading] = useRecoilState(loadingAtom);
    const [errormsg, setErrormsg] = useRecoilState(errorAtom);
    const [modelCourse, setModelCourse] = useRecoilState(courseAtom);

    const fetchCoursesAndPurchases = async () => {
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

            const updatedCourses = allCourses.map((course) => {
                const isPurchased = purchasedCourseIds.includes(course._id)

                console.log(course._id)
                console.log(isPurchased)
                return { ...course, buttonMsg: isPurchased ? 'View Details' : 'Buy Course' };
            });
            console.log(updatedCourses)
            console.log(userPurchases)
            
            setModelCourse(updatedCourses);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setErrormsg(err.message);
        }
    };

    useEffect(() => {
        fetchCoursesAndPurchases();
    }, []);

    return (
        <div className="flex min-h-screen mt-20">
            {/* Sidebar */}
            <SideBar />
            {/* Courses Section */}
            <div className="flex-grow p-4 ml-20">
                {loading ? (
                    <div className="text-center text-red-400">Loading...</div>
                ) : errormsg ? (
                    <div className="text-red-400 text-center">{errormsg}</div>
                ) : (
                    <div className="grid ml-12 md:ml-5 lg:ml-10 xl:ml-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                        {modelCourse.map((course) => (
                            <div key={course._id}>
                                <CoursePageCard course={course}  />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Main;
