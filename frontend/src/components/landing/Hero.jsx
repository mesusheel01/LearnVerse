import React, { useEffect } from 'react';
import ExploreButton from '../landing/MainButton';
import { useRecoilState } from 'recoil';
import { courseAtom } from '../../store/atoms/courseFetch';
import { loadingAtom, errorAtom } from '../../store/atoms/errorAndLoading';
import axios from 'axios';
import CourseCard from './CourseCard';
import { useNavigate } from 'react-router-dom';
import Marquee from 'react-fast-marquee';

const Hero = () => {
    const [modelCourse, setModelCourse] = useRecoilState(courseAtom);
    const [loading, setLoading] = useRecoilState(loadingAtom);
    const [errormsg, setErrormsg] = useRecoilState(errorAtom);
    const navigate = useNavigate();

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

    return (
        <div>
            <div className="flex flex-col items-center justify-center gap-8 mt-16 font-aclonica">
                <p className="dark:text-waikawa-200 text-lg sm:text-2xl md:text-3xl lg:text-4xl">
                    Turn Your Ambitions <br />
                    <span className="pl-2">into Achievements!</span>
                </p>
                <p className="dark:text-waikawa-400 text-sm lg:text-lg">
                    Learn in-demand skills with engaging, flexible, and accessible courses tailored to your goals.
                </p>
            </div>
            <div className="flex items-center justify-center text-center text-sm font-aclonica mt-12 text-[.8rem] sm:text[1rem]">
                <ExploreButton title="Explore button" routeTo="/courses" />
            </div>
            {/* Gradient Indicators */}
            <div className="relative hidden md:block">
                <div className="absolute gradient-left top-10  left-[18vh] lg:left-[18vh] lg:top-[3rem] h-[48vh] lg:h-[45vh] w-[5vw] rounded-xl bg-gradient-to-r from-waikawa-900 to-transparent"></div>
                <div className="absolute gradient-right left-[78vw] lg:left-[86vw] top-[5vh] lg:top-[3rem] h-[48vh] lg:h-[45vh] w-[5vw] rounded-xl bg-gradient-to-l from-waikawa-900 to-transparent"></div>
            </div>
            <div className="text-red-400 mt-8">
                {loading ? (
                    <div>Loading...</div>
                ) : errormsg ? (
                    <div className="text-red-400">{errormsg}</div>
                ) : (
                    <div className="mx-10 md:mx-40">
                        <Marquee autoFill pauseOnHover>
                            <div className="overflow-x-auto font-poppins whitespace-nowrap courses space-x-4 flex px-4">
                                {modelCourse.map((course) => (
                                    <button onClick={() => navigate('/courses')}>
                                        <CourseCard course={course} />
                                    </button>
                                ))}
                            </div>
                        </Marquee>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Hero;
