import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { darkAtom } from '../../store/atoms/darkMode';
import { CiSearch } from 'react-icons/ci';
import { useLocation, useNavigate } from 'react-router-dom';
import { courseAtom } from '../../store/atoms/courseFetch';

const Navbar = () => {
    const [theme, setTheme] = useRecoilState(darkAtom);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredRes, setFilteredRes] = useState([]);
    const modelCourses = useRecoilValue(courseAtom);
    const inputRef = useRef();
    const location = useLocation();
    const navigate = useNavigate()

    useEffect(() => {
        const res = modelCourses.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredRes(res);
    }, [searchQuery, location, modelCourses]);

    const toggleTheme = () => {
        setTheme((theme) => {
            const newTheme = theme === 'dark' ? 'light' : 'dark';
            document.documentElement.classList.remove(theme);
            document.documentElement.classList.add(newTheme);
            return newTheme;
        });
    };

    const giveRefToInput = () => {
        inputRef.current.focus();
    };

    return (
        <>
            <nav className="fixed top-0 left-0 h-20 w-full flex justify-between border-b border-waikawa-600 items-center px-6 py-4 sm:px-10 md:px-14 lg:px-16 text-sm sm:text-base md:text-lg dark:bg-bunker-950 shadow-md z-50">
                {/* Logo */}
                <div className="text-lg sm:text-xl lg:text-2xl font-aclonica dark:text-waikawa-400">
                    LearnVerse
                </div>
                {/* Search Input */}
                <div className="relative flex items-center gap-1 w-[25vh] sm:w-[30vh]">
                    <input
                        value={searchQuery}
                        ref={inputRef}
                        type="text"
                        placeholder="Search Courses..."
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="rounded-xl w-full pl-3 text-sm p-1 bg-input-color border border-1 text-waikawa-300 py-[.8vh] font-poppins border-waikawa-950 focus:outline-none focus:border-purple-800"
                    />
                    <CiSearch
                        onClick={giveRefToInput}
                        className="text-waikawa-200 text-xl hover:text-2xl transition-all duration-200 hover:mt-0"
                    />
                    {/* Search Results */}
                    {searchQuery && filteredRes.length > 0 && (
                        <div className="absolute top-full mt-2 w-full bg-white shadow-lg rounded-md border border-waikawa-200 dark:bg-bunker-950 dark:border-waikawa-600">
                            {filteredRes.map((item) => (
                                <div
                                    onClick={()=>navigate(`/courses/${item?.title}`)}
                                    key={item.id}
                                    className="p-2 hover:bg-purple-100 dark:hover:bg-purple-900 text-waikawa-800 dark:text-waikawa-300 cursor-pointer"
                                >
                                    {item.title}
                                </div>
                            ))}
                        </div>
                    )}
                    {searchQuery && filteredRes.length === 0 && (
                        <div className="absolute top-full mt-2 w-full bg-white shadow-lg rounded-md border border-waikawa-200 dark:bg-bunker-950 dark:border-waikawa-600 p-2 text-center text-waikawa-500 dark:text-waikawa-400">
                            No results found
                        </div>
                    )}
                </div>
                {/* Links and Buttons */}
                <div className="flex gap-3 font-aclonica text-[.7rem] md:text-[.8rem] items-center">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full dark:text-waikawa-400 hover:dark:text-waikawa-600 transition duration-300"
                    >
                        {theme === 'dark' ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
