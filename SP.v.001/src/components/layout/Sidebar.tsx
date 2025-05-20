import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Calendar, CheckSquare, Home, Target } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Sidebar: React.FC = () => {
  const { sidebarOpen } = useApp();
  
  const navigationItems = [
    { name: 'Dashboard', icon: <Home size={20} />, path: '/' },
    { name: 'Schedule', icon: <Calendar size={20} />, path: '/schedule' },
    { name: 'Tasks', icon: <CheckSquare size={20} />, path: '/tasks' },
    { name: 'AI Schedule', icon: <Target size={20} />, path: '/ai-schedule' },
  ];
  
  return (
    <aside 
      className={`fixed inset-y-0 left-0 bg-white border-r border-gray-200 z-40 transition-all duration-300 ease-in-out ${
        sidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="h-16 flex items-center justify-center border-b border-gray-200">
        <div className={`flex items-center ${sidebarOpen ? 'justify-start px-6' : 'justify-center'}`}>
          <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <BookOpen size={16} className="text-white" />
          </div>
          {sidebarOpen && (
            <h1 className="ml-3 text-xl font-bold text-gray-900">StudyFlow</h1>
          )}
        </div>
      </div>
      
      <nav className="mt-6 px-2">
        <ul className="space-y-1">
          {navigationItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) => `
                  flex items-center px-3 py-2.5 rounded-lg text-sm font-medium
                  ${isActive 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-100'
                  }
                  ${sidebarOpen ? 'justify-start' : 'justify-center'}
                `}
              >
                <span className="inline-block">{item.icon}</span>
                {sidebarOpen && <span className="ml-3">{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;