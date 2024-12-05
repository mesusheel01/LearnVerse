import React from 'react'
import { useRecoilValue } from 'recoil'
import { courseBuyDetailAtom } from '../store/atoms/courseBuyDetail'

const CourseDetail = () => {
    const courseBuyDetail = useRecoilValue(courseBuyDetailAtom)

  return (
    <div className=''>
        <h1>
            {courseBuyDetail._id}
        </h1>
    </div>
  )
}

export default CourseDetail
