import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  LayoutDashboard, 
  User, 
  LogOut, 
  Menu, 
  X 
} from "lucide-react";

const Sidebar = () => {
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
        className="sm:hidden fixed top-4 left-4 z-50 bg-gradient-to-br from-indigo-600 to-purple-800 p-3 rounded-full shadow-lg text-white"
      >
        {isSidebarOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-indigo-800 to-purple-900 shadow-2xl flex flex-col transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 w-64 z-40`}
      >
        <div className="p-6 flex items-center justify-center space-x-3 border-b border-indigo-700">
          <User className="text-amber-400 w-8 h-8" />
          <h2 className="text-2xl font-bold text-amber-400">User Role</h2>
        </div>

        <nav className="flex-1 p-4 mt-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/user"
                className="flex items-center p-3 rounded-lg text-white hover:bg-indigo-700 hover:text-amber-400 transition group"
              >
                <LayoutDashboard className="mr-3 group-hover:text-amber-400" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/user/following"
                className="flex items-center p-3 rounded-lg text-white hover:bg-indigo-700 hover:text-amber-400 transition group"
              >
                <User className="mr-3 group-hover:text-amber-400" />
                <span>Creators-Following</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-indigo-700">
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

export default Sidebar;