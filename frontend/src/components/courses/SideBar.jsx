import React, { useState } from 'react';
import { SidebarComponent, SideBarItem } from './SideBarComponent';
import { BsSave2 } from 'react-icons/bs';
import { HiOutlineHome } from 'react-icons/hi';
import { GoBook } from 'react-icons/go';
import { useRecoilValue } from 'recoil';
import { toggleSidebarAtom } from '../../store/atoms/toggleSidebar';
import { tokenAtom } from '../../store/atoms/tokenCheck';

const SideBar = () => {
  const expanded = useRecoilValue(toggleSidebarAtom);
  const token = useRecoilValue(tokenAtom);
  const [activeButton, setActiveButton] = useState('');

  return (
    <aside>
      <div
        className={`${
          expanded ? 'w-54' : 'w-16'
        } fixed top-[10.vh] flex-shrink-0 transition-all duration-300 z-10`}
      >
        <SidebarComponent>
          <SideBarItem
            icon={<HiOutlineHome className="text-waikawa-600" size={25} />}
            text="Home"
            isActive={activeButton === 'Home'}
            onClick={() => setActiveButton('Home')}
          />
          <SideBarItem
            icon={<GoBook className="text-waikawa-600" size={25} />}
            text="Courses"
            isActive={activeButton === 'Courses'}
            onClick={() => setActiveButton('Courses')}
          />
          {token && (
            <SideBarItem
              icon={<BsSave2 className="text-waikawa-600 ml-[2px]" size={20} />}
              text="Purchases"
              isActive={activeButton === 'Purchases'}
              onClick={() => setActiveButton('Purchases')}
            />
          )}
        </SidebarComponent>
      </div>
    </aside>
  );
};

export default SideBar;
