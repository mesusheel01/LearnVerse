import React from 'react'
import Navbar from './courses/Navbar'
import Main from './courses/Main'


const Courses = () => {
  return (
    <div className='min-h-screen dark:bg-bunker-950 light:bg-waikawa-100'>
      <Navbar />
      <Main />
    </div>
  )
}

export default Courses
