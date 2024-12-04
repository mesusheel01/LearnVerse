import React, { useEffect } from 'react';
import { courseAtom } from '../../store/atoms/courseFetch';
import { errorAtom, loadingAtom } from '../../store/atoms/errorAndLoading';
import { toggleSidebarAtom } from '../../store/atoms/toggleSidebar';
import { useRecoilState, useRecoilValue } from 'recoil';
import axios from 'axios';
import CoursePageCard from './CoursePageCard';
import { HiOutlineHome } from 'react-icons/hi';
import { GoBook } from 'react-icons/go';
import { BsSave2 } from 'react-icons/bs';
import { Sidebar, SideBarItem } from './SideBar';

const Main = () => {
    const [modelCourse, setModelCourse] = useRecoilState(courseAtom);
    const [loading, setLoading] = useRecoilState(loadingAtom);
    const [errormsg, setErrormsg] = useRecoilState(errorAtom);
    const expanded = useRecoilValue(toggleSidebarAtom); // Sidebar state

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('http://localhost:3000/api/courses');
            if (data.courses && data.courses.length) {
                setModelCourse(data.courses);
            }
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
        <div className="flex min-h-screen mt-20">
            {/* Sidebar */}
            <div
                className={`${
                    expanded ? 'w-54' : 'w-16'
                } bg-gray-100 fixed top-[10.36vh] flex-shrink-0 h-full transition-all duration-300 z-10`}
            >
                <Sidebar>
                    <SideBarItem
                        icon={<HiOutlineHome className="text-waikawa-600" size={25} />}
                        text="Home"
                    />
                    <SideBarItem
                        icon={<GoBook className="text-waikawa-600" size={25} />}
                        text="Courses"
                        active
                    />
                    <SideBarItem
                        icon={<BsSave2 className="text-waikawa-600 ml-[2px]" size={20} />}
                        text="Purchases"
                    />
                </Sidebar>
            </div>

            {/* Courses Section */}
            <div className="flex-grow p-4 ml-20">
                {loading ? (
                    <div className="text-center text-red-400">Loading...</div>
                ) : errormsg ? (
                    <div className="text-red-400 text-center">{errormsg}</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                        {modelCourse.map((course) => (
                            <button key={course.id}>
                                <CoursePageCard course={course} />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Main;
