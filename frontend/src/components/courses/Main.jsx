import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { courseAtom } from '../../store/atoms/courseFetch';
import { errorAtom, loadingAtom } from '../../store/atoms/errorAndLoading';
import { toggleSidebarAtom } from '../../store/atoms/toggleSidebar';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import CoursePageCard from './CoursePageCard';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';

const Main = () => {
    const [modelCourse, setModelCourse] = useRecoilState(courseAtom);
    const [loading, setLoading] = useRecoilState(loadingAtom);
    const [errormsg, setErrormsg] = useRecoilState(errorAtom);
    const [toggleSidebar, setToggleSidebar] = useRecoilState(toggleSidebarAtom);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('http://localhost:3000/api/courses');
            console.log('Fetched courses:', data.courses);
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

    const handleToggleSidebar = () => {
        setToggleSidebar(!toggleSidebar);
        console.log(toggleSidebar);
    };

    return (
        <div className={`grid grid-cols-1 lg:grid-cols-5 min-h-screen relative ${!toggleSidebar && "px-10"}`}>
            {/* Sidebar */}
            <div
                className={`absolute lg:relative lg:col-span-1 rounded-xl m-2 bg-waikawa-950 text-white min-h-screen p-4 transition-all duration-300 ease-in-out z-10 ${
                    toggleSidebar ? 'w-[30vh]' : 'w-0 lg:w-[30vh]'
                }`}
            >
                <div className={`flex flex-col h-full ${toggleSidebar || 'hidden lg:flex'}`}>
                    {/* Sidebar content here */}
                    <h2 className="text-xl font-bold">Sidebar</h2>
                    <p>Sidebar Content</p>
                </div>
                <button
                    onClick={handleToggleSidebar}
                    className="lg:hidden absolute top-4 right-[-10px] bg-waikawa-950 text-white p-2 rounded-full"
                >
                {
                    toggleSidebar?
                    <MdKeyboardDoubleArrowLeft />:
                    <MdKeyboardDoubleArrowRight />
                }
                </button>
            </div>

            {/* Courses Section */}
            <div
                className={`lg:col-span-4 p-4 transition-all duration-300 ease-in-out ${
                    toggleSidebar ? 'ml-[30vh] lg:ml-0' : 'ml-0'
                }`}
            >
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
