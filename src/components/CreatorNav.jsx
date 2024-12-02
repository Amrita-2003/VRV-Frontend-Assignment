import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  Newspaper, 
  Pen, 
  LogOut, 
  Menu, 
  X 
} from "lucide-react";

const CSidebar = () => {
  const { logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogOut = () => {
    logout();
  };

  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="sm:hidden fixed top-4 left-4 z-50 bg-gradient-to-br from-purple-600 to-purple-800 p-3 rounded-full shadow-lg text-white"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-indigo-900 to-indigo-950 shadow-2xl flex flex-col font-spaceGrotesk transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 sm:w-64 z-40`}
      >
        <div className="p-6 flex items-center justify-center space-x-3 border-b border-indigo-800">
          <Pen className="text-cyan-400 w-8 h-8" />
          <h2 className="text-2xl font-bold text-cyan-400">Creator Role</h2>
        </div>

        <nav className="flex-1 p-4 mt-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/creator"
                className="flex items-center p-3 rounded-lg text-white hover:bg-indigo-800 hover:text-cyan-400 transition group"
              >
                <Newspaper className="mr-3 group-hover:text-cyan-400" />
                <span>Past Blogs</span>
              </Link>
            </li>
            <li>
              <Link
                to="/creator/write"
                className="flex items-center p-3 rounded-lg text-white hover:bg-indigo-800 hover:text-cyan-400 transition group"
              >
                <Pen className="mr-3 group-hover:text-cyan-400" />
                <span>Write a Blog</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-indigo-800">
          <button
            onClick={handleLogOut}
            className="w-full flex items-center justify-center p-3 bg-rose-600 rounded-lg hover:bg-rose-700 transition text-white space-x-2"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default CSidebar;