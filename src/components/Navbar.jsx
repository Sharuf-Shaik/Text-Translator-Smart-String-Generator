import { NavLink } from 'react-router-dom';
import { Languages, Fingerprint, Home, Moon, Sun } from 'lucide-react';
import useDarkMode from '../hooks/useDarkMode';

const Navbar = () => {
  const [isDark, setIsDark] = useDarkMode();

  const activeStyle = "text-violet-600 bg-violet-50 dark:text-violet-400 dark:bg-violet-900/30 font-semibold";
  const defaultStyle = "text-slate-600 dark:text-slate-300 hover:text-violet-600 hover:bg-violet-50 dark:hover:text-violet-400 dark:hover:bg-violet-900/30 transition-colors";

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center space-x-2 text-xl font-bold primary-gradient-text">
              <Languages className="w-6 h-6 text-violet-600 dark:text-violet-400" />
              <span>MultiTool SPA</span>
            </NavLink>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-4">
            <NavLink 
              to="/" 
              className={({ isActive }) => `flex items-center space-x-1 px-3 py-2 rounded-md text-sm ${isActive ? activeStyle : defaultStyle}`}
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </NavLink>
            <NavLink 
              to="/translator" 
              className={({ isActive }) => `flex items-center space-x-1 px-3 py-2 rounded-md text-sm ${isActive ? activeStyle : defaultStyle}`}
            >
              <Languages className="w-4 h-4" />
              <span className="hidden sm:inline">Translator</span>
            </NavLink>
            <NavLink 
              to="/string-generator" 
              className={({ isActive }) => `flex items-center space-x-1 px-3 py-2 rounded-md text-sm ${isActive ? activeStyle : defaultStyle}`}
            >
              <Fingerprint className="w-4 h-4" />
              <span className="hidden sm:inline">String Gen</span>
            </NavLink>
            
            <div className="border-l border-slate-200 dark:border-slate-700 h-6 mx-2"></div>
            
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full text-slate-500 hover:text-violet-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-violet-400 dark:hover:bg-slate-800 transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
