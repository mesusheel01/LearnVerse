import React from 'react'
import Navbar from './landing/Navbar'
import Hero from './landing/Hero'
import Footer from './landing/Footer'

const Landing = () => {
  return (
        <div className='min-h-screen dark:bg-bunker-950 light:bg-waikawa-100'>
            <Navbar />
            <Hero />
            <Footer />
        </div>
  )
}

export default Landing
