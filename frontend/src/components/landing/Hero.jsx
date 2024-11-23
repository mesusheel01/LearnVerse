import React, { useEffect } from 'react'
import ExploreButton from '../landing/MainButton'
import { useRecoilState } from 'recoil'
import { courseAtom } from '../../store/atoms/courseFetch'
import { loadingAtom,errorAtom } from '../../store/atoms/errorAndLoading'
import axios from 'axios'


const Hero = () => {
    const [modelCourse, setModelCourse] = useRecoilState(courseAtom)
    const [loading, setLoading] = useRecoilState(loadingAtom)
    const [errormsg, setErrormsg] = useRecoilState(errorAtom)

    const fetchCourses = async()=>{
        try{
            setLoading(true)
            const response = await axios.get('http://localhost:3000/api/courses')
            const courses =await response.data
            if(courses.length){
                setLoading(false)
                setModelCourse(courses)
                console.log(modelCourse)
            }
        }catch(err){
            setLoading(false)
            setErrormsg(err.message)
        }
    }

    useEffect(()=>{
         fetchCourses()
    },[])

  return (
    <div>
        <div className='flex flex-col items-center justify-center gap-8 mt-16 font-aclonica'>
            <p className='dark:text-waikawa-200  text-lg sm:text-2xl md:text-3xl lg:text-4xl'>Turn Your Ambitions <br/><span className='pl-2'>into Achievements!</span></p>
            <p className='dark:text-waikawa-400 text-sm lg:text-lg'>Learn in-demand skills with engaging, flexible, and accessible courses tailored to your goals.</p>
        </div>
        <div className='flex items-center justify-center text-center text-sm font-aclonica mt-16 text-[.8rem] sm:text[1rem]'>
            <ExploreButton title="Explore button" routeTo='/courses' />
        </div>
        <div className='text-red-400'>
            {
                loading && <div>Loading...</div>
            }{
                errormsg && <div>{errormsg}</div>
            }
            {
                modelCourse.map((c,key)=>(
                    <div key={key}>
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
                    </div>
                ))
            }
        </div>
        {/* line */}
        <div className='absolute top-16 w-full h-[1px] dark:bg-waikawa-600 light:text-waikawa-950 '></div>
    </div>
  )
}

export default Hero
