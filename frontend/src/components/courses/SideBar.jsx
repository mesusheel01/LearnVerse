import { CgMoreVertical } from "react-icons/cg";
import { toggleSidebarAtom } from "../../store/atoms/toggleSidebar";
import { useRecoilState } from "recoil";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import image from '../../assets/Images/image.png'

export const Sidebar = ({ children }) => {
  const [expanded, setExpanded] = useRecoilState(toggleSidebarAtom);

  return (
    <aside
      className={`h-screen ${
        expanded ? "w-[30vh]" : "w-[10vh]"
      } transition-all duration-300`}
    >
      <nav className="h-[90%] flex flex-col bg-waikawa-950 border-r border-waikawa-600  shadow-lg">
        <div className="p-4 pb-2 flex justify-end">
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-2 -translate-x-2 hover:bg-waikawa-300  rounded-lg bg-waikawa-200"
          >
            {expanded ? <MdKeyboardDoubleArrowLeft /> : <MdKeyboardDoubleArrowRight />}
          </button>
        </div>

        {/* children section */}
        <ul className="flex-1 px-3">{children}</ul>

        {/* user section */}
        <div className="border-t border-waikawa-600 flex p-3 ">
          <img
            src={image}
            alt="user_image"
            className="w-10 h-10 rounded-md bg-waikawa-800 mt-2"
          />
          {expanded && (
            <div className={`flex justify-between items-center w-full ml-3`}>
              <div className="bg-waikawa-800 rounded-lg p-1">
                <h4 className="font-semibold text-wai">Susheel Kyle</h4>
                <span className="text-xs text-waikawa-950">
                  Susheelkyle@gmail.com
                </span>
              </div>
              <CgMoreVertical size={20} />
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

export function SideBarItem({ icon, text, active }) {
  const [expanded] = useRecoilState(toggleSidebarAtom);

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors text-waikawa-200 hover:text-waikawa-950 group ${
        active? "bg-waikawa-900" : "hover:bg-waikawa-200 "
      }`}
    >
      {icon}
      <span
        className={`${
          expanded ? "ml-5" : "w-0"
        } overflow-hidden text-md font-poppins `}
      >
        {text}
      </span>
      {
        !expanded && (
            <div className={`absolute left-full rounded-md px-2 ml-6 text-sm  text-waikawa-400 bg-bunker-950 p-1 invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                {text}
            </div>
        )
      }
    </li>
  );
}
