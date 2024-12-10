import { CgMoreVertical } from "react-icons/cg";
import { toggleSidebarAtom } from "../../store/atoms/toggleSidebar";
import { useRecoilState } from "recoil";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import image from '../../assets/Images/image.png'
import { tokenAtom } from "../../store/atoms/tokenCheck";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const SidebarComponent = ({ children }) => {
  const [expanded, setExpanded] = useRecoilState(toggleSidebarAtom);
  const [token, setToken] = useRecoilState(tokenAtom);


  useEffect(() => {
    const tokenCheck = localStorage.getItem("token");

    if (tokenCheck) {
      const decodedToken = JSON.parse(atob(tokenCheck.split(".")[1]));
      const expiryTime = decodedToken.exp * 1000 + 3600;

      if (Date.now() < expiryTime) {
        setToken(tokenCheck);

        const timeUntilExpiry = expiryTime - Date.now();
        setTimeout(() => {
          localStorage.removeItem("token");
          setToken(null);
        }, timeUntilExpiry);
      } else {
        localStorage.removeItem("token");
        setToken(null);
      }
    }

    const handleStorageCheck = () => {
      const updatedToken = localStorage.getItem("token");
      setToken(updatedToken || null);
    };

    window.addEventListener("storage", handleStorageCheck);

    return () => {
      window.removeEventListener("storage", handleStorageCheck);
    };
  }, []);

  return (
    <aside
      className={`h-screen ${
        expanded ? "w-[30vh]" : "w-[10vh]"
      } transition-all duration-300 m-2  `}
    >
      <nav className="h-[91%] rounded-xl flex flex-col bg-waikawa-950 border-r border-waikawa-600 shadow-lg">
        <div className="p-4 pb-2 flex justify-end">
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className={`p-2 -translate-x-1 lg:-translate-x-1 xl:-translate-x-3 text-waikawa-200 text-xl ${expanded?"hover:-translate-x-3 lg:hover:-translate-x-6":" hover:translate-x-2 lg:translate-x-0"}  transition-all duration-300 rounded-lg `}
          >
            {expanded ? <MdKeyboardDoubleArrowLeft /> : <MdKeyboardDoubleArrowRight />}
          </button>
        </div>

        <ul className="flex-1 px-3">{children}</ul>
        {token && (
          <div className="border-t border-waikawa-600 flex p-3">
            <img
              src={image}
              alt="user_image"
              className="w-10 h-10 rounded-md bg-waikawa-800 mt-2"
            />
            {expanded && (
              <div className="flex justify-between items-center w-full ml-3">
                <div className="bg-waikawa-800 rounded-lg p-1">
                  <h4 className="font-semibold text-wai">Susheel Kyle</h4>
                  <span className="text-xs text-waikawa-950">
                    Susheelkyle@gmail.com
                  </span>
                </div>
                <CgMoreVertical size={20} className="text-waikawa-400" onClick={()=>setUserMenu(curr => !curr)} />
              </div>
            )}
          </div>
        )}
      </nav>
    </aside>
  );
};

export function SideBarItem({ icon, text, active }) {
  const [expanded] = useRecoilState(toggleSidebarAtom);
  const navigate = useNavigate()
  function handleNavigationClick(){
    const currentPath = window.location.pathname
    console.log(currentPath)
    let target = ''
     if(text==='Home'){
         target = '/'
        }
        else if( text==='Purchases'){
            target= '/home'
        }else if(text === 'Courses'){
            target = '/courses'
        }
        if(currentPath !== target){
            navigate(target)
        }
  }

  return (
    <li
      onClick={handleNavigationClick}
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors text-waikawa-200 hover:text-waikawa-950 group ${
        active ? "bg-waikawa-900" : "hover:bg-waikawa-200"
      }`}
    >
      {icon}
      <span
        className={`${
          expanded ? "ml-5" : "w-0"
        } overflow-hidden text-md font-poppins`}
      >
        {text}
      </span>
      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 ml-6 text-sm text-waikawa-400 bg-bunker-950 p-1 invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
}
