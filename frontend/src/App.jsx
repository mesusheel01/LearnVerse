import React from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import Courses from './components/Courses'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Landing from './components/Landing'
import UserSection from './components/UserSection'


const App = () => {
    // const navigate = useNavigate()

  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/courses' element={<Courses />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/home' element={<UserSection />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
