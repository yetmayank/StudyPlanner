import React from 'react';
import { Calendar, CheckSquare, BookOpen } from 'lucide-react';

interface SidebarProps {
  activeTab: 'schedule' | 'tasks' | 'subjects';
  onTabChange: (tab: 'schedule' | 'tasks' | 'subjects') => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="w-64 bg-white h-screen border-r border-gray-200 p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-indigo-600">StudyPlanner</h1>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => onTabChange('schedule')}
              className={`w-full flex items-center space-x-3 p-2 rounded-lg ${
                activeTab === 'schedule'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>Schedule</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => onTabChange('tasks')}
              className={`w-full flex items-center space-x-3 p-2 rounded-lg ${
                activeTab === 'tasks'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
              }`}
            >
              <CheckSquare className="w-5 h-5" />
              <span>Tasks</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => onTabChange('subjects')}
              className={`w-full flex items-center space-x-3 p-2 rounded-lg ${
                activeTab === 'subjects'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span>Subjects</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}