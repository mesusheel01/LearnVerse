import React from 'react'
import { SidebarComponent, SideBarItem } from './SideBarComponent'
import { BsSave2 } from 'react-icons/bs'
import { HiOutlineHome } from 'react-icons/hi'
import { GoBook } from 'react-icons/go'
import { useRecoilValue } from 'recoil'
import { toggleSidebarAtom } from '../../store/atoms/toggleSidebar'
import { tokenAtom } from '../../store/atoms/tokenCheck'

const SideBar = () => {
    const expanded  = useRecoilValue(toggleSidebarAtom)
    const token = useRecoilValue(tokenAtom)
  return (
    <div>
      <div
            className={`${
                expanded ? 'w-54' : 'w-16'
            } fixed top-[10.vh] flex-shrink-0 h-full transition-all duration-300 z-10`}
        >
            <SidebarComponent >
                <SideBarItem
                    icon={<HiOutlineHome  className="text-waikawa-600" size={25} />}
                    text="Home"
                />
                <SideBarItem
                    icon={<GoBook className="text-waikawa-600" size={25} />}
                    text="Courses"
                    active
                />
                {
                    token && <SideBarItem
                    icon={<BsSave2 className="text-waikawa-600 ml-[2px]" size={20} />}
                    text="Purchases"
                />
                }
            </SidebarComponent>
        </div>
    </div>
  )
}

export default SideBar
