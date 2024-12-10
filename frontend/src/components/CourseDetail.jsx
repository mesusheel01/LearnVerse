import React from 'react'
import { useRecoilValue } from 'recoil'
import { courseBuyDetailAtom } from '../store/atoms/courseBuyDetail'
import Navbar from './courses/Navbar'
import SideBar from './courses/SideBar'
import { toggleSidebarAtom } from '../store/atoms/toggleSidebar'



export const CourseDetail = () => {

  return (
    <div className='bg-bunker-950 flex flex-col min-h-screen mt-20'>
        <Navbar />
        <SideBar />
        <MainCourseDetail />
    </div>
  )
}

export const MainCourseDetail = () => {
    const courseBuyDetail = useRecoilValue(courseBuyDetailAtom);
    const expanded = useRecoilValue(toggleSidebarAtom);
    console.log(courseBuyDetail);

    return (
    <div className='absolute mt-60 w-full'>
      <div className='flex items-center'>
        <div className={`col-span-1 m-2 ml-0 lg:ml-2 transition-all duration-300 bg-waikawa-950 h-[30vh] p-4 rounded-xl shadow-lg w-[79%]
${expanded
    ? "translate-x-[31vh] md:w-[90%] sm:w-[95%] w-full "
    : "translate-x-24 lg:w-[93.5%] md:w-[89%] sm:w-[80%] w-full"
  } `}>

        </div>
        <div className={`m-2 ml-0 lg:ml-2 transition-all duration-300 bg-waikawa-200 h-[30vh] p-4 rounded-xl shadow-lg -translate-y-10 w-[79%]
${expanded
    ? "translate-x-[31vh] md:w-[90%] sm:w-[95%] w-full"
    : "translate-x-24 lg:w-[93.5%] md:w-[87%] sm:w-[95%] w-full"
  }`}>

        </div>
      </div>
      </div>
    );
  };

  //
//
