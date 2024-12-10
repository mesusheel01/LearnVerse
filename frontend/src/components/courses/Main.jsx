import React, { useEffect } from 'react';
import { courseAtom } from '../../store/atoms/courseFetch';
import { errorAtom, loadingAtom } from '../../store/atoms/errorAndLoading';
import { useRecoilState} from 'recoil';
import axios from 'axios';
import CoursePageCard from './CoursePageCard';
import SideBar from './SideBar';

const Main = () => {
    const [modelCourse, setModelCourse] = useRecoilState(courseAtom);
    const [loading, setLoading] = useRecoilState(loadingAtom);
    const [errormsg, setErrormsg] = useRecoilState(errorAtom);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const { allCourse } = await axios.get('http://localhost:3000/api/courses');
            const { userPurchases } = await axios.get('http://localhost:3000/api/user/purchases');

            if (allCourse.courses && allCourse.courses.length) {
                setModelCourse(data.courses);
            }
            if (userPurchases.courses && userPurchases.courses.length) {
                setPurchases(data.courses);
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
                                <CoursePageCard course={course} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Main;
