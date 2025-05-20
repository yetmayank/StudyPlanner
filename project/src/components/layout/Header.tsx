import React from 'react';
import { Bell, Calendar, Menu, Search, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Header: React.FC = () => {
  const { toggleSidebar, notifications } = useApp();
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none"
          >
            <Menu size={20} />
          </button>
          <div className="relative max-w-md w-full hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 relative">
            <Calendar size={20} />
          </button>
          <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 relative">
            <Bell size={20} />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 -mt-1 -mr-1 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full">
                {notifications.length > 9 ? '9+' : notifications.length}
              </span>
            )}
          </button>
          <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
            <User size={18} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;