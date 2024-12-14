import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { courseAtom } from '../../store/atoms/courseFetch';
import PurchaseCourseCard from './PurchaseCourseCard';
import { errorAtom, loadingAtom } from '../../store/atoms/errorAndLoading';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const UserHero = () => {
    const [loading, setLoading] = useRecoilState(loadingAtom);
    const [errormsg, setErrormsg] = useRecoilState(errorAtom);
    const [username, setUsername] = useState("");
    const [modelCourse, setModelCourse] = useRecoilState(courseAtom);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const decode = jwtDecode(token);
            setUsername(decode.username);

            const [allCoursesRes, userPurchasesRes] = await Promise.all([
                axios.get('http://localhost:3000/api/courses'),
                axios.get('http://localhost:3000/api/user/purchasedCourses', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }),
            ]);

            const allCourses = allCoursesRes.data.courses || [];
            const userPurchases = userPurchasesRes.data.courses || [];
            const purchasedCourseIds = userPurchases.map((purchase) => purchase.courseId);
            const updatedCourses = allCourses.map((c) => ({
                ...c,
                isPurchased: purchasedCourseIds.includes(c._id),
            }));

            const purchasedCourses = updatedCourses.filter((course) => course.isPurchased);
            setModelCourse(purchasedCourses);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setErrormsg(err.message);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <div className='min-h-screen items-center mt-20 bg-bunker-950 flex flex-col'>
            {/* User welcome section */}
            <div className='flex justify-center text-center translate-x-5 p-4'>
                <p className='text-waikawa-300 text-xl sm:text-2xl md:text-3xl font-aclonica text-center'>
                    Welcome {modelCourse.length === 0 ? "" : "back!"}
                    <span className='text-transparent bg-clip-text bg-gradient-to-r mx-3 hover:shadow-lg transition-all duration-300  hover:shadow-purple-900 p-2 rounded-xl from-waikawa-300 via-purple-400 to-waikawa-600'>
                        {username || "User"}
                    </span>!
                </p>
            </div>

            {/* User courses section */}
            <div className='flex-grow p-4'>
                {loading ? (
                    <div className='text-center text-red-400'>Loading...</div>
                ) : errormsg ? (
                    <div className='text-red-400 text-center'>{errormsg}</div>
                ) : (
                    <div className='ml-28 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
                        {modelCourse.length === 0 ? (
                            <div className='text-waikawa-200 text-xl text-center'>
                                No courses available to show! Use Sidebar to go to courses section and purchase.
                            </div>
                        ) : ( 
                            modelCourse.map((course) => (
                                <PurchaseCourseCard key={course._id} course={course} />
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* Refresh button */}
            <div className='flex justify-center mt-6'>
                <button
                    onClick={fetchCourses}
                    className='hover:shadow-lg hover:shadow-purple-800 border transition-all duration-200 p-2 mb-5 rounded-xl text-waikawa-200'>
                    Refresh the database!
                </button>
            </div>
        </div>
    );
};

export default UserHero;
