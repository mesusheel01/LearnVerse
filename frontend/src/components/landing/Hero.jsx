import React, { useEffect } from 'react';
import ExploreButton from '../landing/MainButton';
import { useRecoilState } from 'recoil';
import { courseAtom } from '../../store/atoms/courseFetch';
import { loadingAtom, errorAtom } from '../../store/atoms/errorAndLoading';
import axios from 'axios';

const Hero = () => {
    const [modelCourse, setModelCourse] = useRecoilState(courseAtom);
    const [loading, setLoading] = useRecoilState(loadingAtom);
    const [errormsg, setErrormsg] = useRecoilState(errorAtom);

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
            <div className="flex items-center justify-center text-center text-sm font-aclonica mt-16 text-[.8rem] sm:text[1rem]">
                <ExploreButton title="Explore button" routeTo="/courses" />
            </div>


            <div className="text-red-400 mt-8">
            {loading ? (
                <div>Loading...</div>
            ) : errormsg ? (
                <div>{errormsg}</div>
            ) : (
                <div className="overflow-x-auto whitespace-nowrap space-x-4 flex px-4">
                    {modelCourse.map((course) => (
                        <div
                            key={course?._id}
                            className="inline-block bg-white shadow-md rounded-lg p-4 min-w-[300px] mx-2 transform transition duration-300 hover:scale-105 dark:bg-waikawa-900 dark:text-white"
                        >

                            <div className="w-full h-40 bg-gray-200 rounded-t-md overflow-hidden">
                                <img
                                    src={course?.imageUrl}
                                    alt={course?.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>


                            <h3 className="text-xl font-bold mt-4 ">{course?.title}</h3>


                            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
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
                        </div>
                    ))}
                </div>
            )}
        </div>
            <div className="absolute top-[98vh] w-full h-[1px] dark:bg-waikawa-600 light:text-waikawa-950"></div>
        </div>
    );
};

export default Hero;
