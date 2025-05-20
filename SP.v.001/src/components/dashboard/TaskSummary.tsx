import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle, Circle, Clock } from 'lucide-react';

const TaskSummary: React.FC = () => {
  const { tasks } = useApp();
  
  // Get today's and overdue tasks
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const todayTasks = tasks.filter(task => {
    if (task.status === 'completed') return false;
    
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate.getTime() === today.getTime();
  });
  
  const overdueTasks = tasks.filter(task => {
    if (task.status === 'completed') return false;
    
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate < today;
  });
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Tasks</h2>
        <span className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
          View All
        </span>
      </div>
      
      <div className="space-y-4">
        {overdueTasks.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-red-500 mb-2 flex items-center">
              <Clock size={14} className="mr-1" />
              Overdue ({overdueTasks.length})
            </h3>
            <div className="space-y-2">
              {overdueTasks.slice(0, 3).map((task, index) => (
                <div 
                  key={index} 
                  className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                >
                  <div className="mr-3">
                    {task.status === 'completed' ? (
                      <CheckCircle size={18} className="text-green-500" />
                    ) : (
                      <Circle size={18} className="text-gray-300" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {task.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {task.subject} • Due {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className={`px-2 py-1 text-xs font-medium rounded ${
                    task.priority === 'high' 
                      ? 'bg-red-100 text-red-800' 
                      : task.priority === 'medium'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                  }`}>
                    {task.priority}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {todayTasks.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-blue-500 mb-2 flex items-center">
              <Clock size={14} className="mr-1" />
              Today ({todayTasks.length})
            </h3>
            <div className="space-y-2">
              {todayTasks.slice(0, 3).map((task, index) => (
                <div 
                  key={index} 
                  className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                >
                  <div className="mr-3">
                    {task.status === 'completed' ? (
                      <CheckCircle size={18} className="text-green-500" />
                    ) : (
                      <Circle size={18} className="text-gray-300" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {task.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {task.subject} • Due Today
                    </p>
                  </div>
                  <div className={`px-2 py-1 text-xs font-medium rounded ${
                    task.priority === 'high' 
                      ? 'bg-red-100 text-red-800' 
                      : task.priority === 'medium'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                  }`}>
                    {task.priority}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {overdueTasks.length === 0 && todayTasks.length === 0 && (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 mx-auto text-green-500" />
            <p className="mt-2 text-gray-500">No tasks due today</p>
            <button className="mt-3 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-200 transition">
              Add New Task
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskSummary;