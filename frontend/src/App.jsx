import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Courses from './components/Courses'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Landing from './components/Landing'
import UserSection from './components/UserSection'
import { RecoilRoot } from 'recoil'
import {CourseDetail} from './components/CourseDetail'


const App = () => {

  return (
    <RecoilRoot>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/courses' element={<Courses />} />
                <Route path='/courses/:courses_title' element={<CourseDetail />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/signin' element={<Signin />} />
                <Route path='/home' element={<UserSection />} />
            </Routes>
        </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
