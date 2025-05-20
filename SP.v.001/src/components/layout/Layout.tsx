import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useApp } from '../../context/AppContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { sidebarOpen } = useApp();
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
        <footer className="bg-white p-4 border-t border-gray-200 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} StudyFlow Planner • All rights reserved
        </footer>
      </div>
    </div>
  );
};

export default Layout;