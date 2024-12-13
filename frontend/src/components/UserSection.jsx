import React from 'react'
import Navbar from './courses/Navbar'
import UserHero from './userSection/UserHero'
import SideBar from './courses/SideBar'


const UserSection = () => {
  return (
    <div className='min-h-screen dark:bg-bunker-950 light:bg-waikawa-100'>
      <Navbar />
      <SideBar />
      <UserHero />
    </div>
  )
}

export default UserSection
