import React from 'react';
import { useApp } from '../../context/AppContext';

const SubjectProgress: React.FC = () => {
  const { subjects } = useApp();
  
  // Sample data - in a real app, this would be calculated from tasks and study sessions
  const sampleSubjects = [
    { name: 'Mathematics', progress: 65, color: 'bg-blue-500' },
    { name: 'Physics', progress: 42, color: 'bg-purple-500' },
    { name: 'Computer Science', progress: 78, color: 'bg-green-500' },
    { name: 'Literature', progress: 30, color: 'bg-amber-500' },
  ];
  
  const subjectsToShow = subjects.length > 0 ? subjects : sampleSubjects;
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Subject Progress</h2>
        <span className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
          View Details
        </span>
      </div>
      
      <div className="space-y-4">
        {subjectsToShow.slice(0, 4).map((subject, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                {subject.name}
              </span>
              <span className="text-sm font-medium text-gray-900">
                {subject.progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`${subject.color} h-2 rounded-full`} 
                style={{ width: `${subject.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectProgress;