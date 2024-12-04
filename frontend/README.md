# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


-- <div className={`flex flex-col h-full ${toggleSidebar || 'hidden lg:flex'}`}>
                    {/* Sidebar content here */}
                    <h2 className="text-xl font-bold">Sidebar</h2>
                    <p>Sidebar Content</p>
                </div>
                <button
                    onClick={handleToggleSidebar}
                    className="lg:hidden absolute top-4 right-[-10px] bg-waikawa-950 text-white p-2 rounded-full"
                >
                {
                    toggleSidebar?
                    <MdKeyboardDoubleArrowLeft />:
                    <MdKeyboardDoubleArrowRight />
                }
                </button>
