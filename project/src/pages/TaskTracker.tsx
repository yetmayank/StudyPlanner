import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Filter, Plus, Search } from 'lucide-react';
import TaskList from '../components/tasks/TaskList';
import TaskForm from '../components/tasks/TaskForm';

const TaskTracker: React.FC = () => {
  const { tasks, subjects } = useApp();
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Filter and search tasks
  const filteredTasks = tasks.filter(task => {
    // Filter by subject
    if (filterSubject !== 'all' && task.subject !== filterSubject) {
      return false;
    }
    
    // Filter by status
    if (filterStatus !== 'all' && task.status !== filterStatus) {
      return false;
    }
    
    // Search by title or description
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      return (
        task.title.toLowerCase().includes(query) ||
        (task.description?.toLowerCase().includes(query))
      );
    }
    
    return true;
  });
  
  // Sort tasks by due date (closest first)
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Task Tracker</h1>
        
        <button
          onClick={() => setIsAddingTask(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-gray-500" />
                <span className="text-sm text-gray-700">Filters:</span>
              </div>
              
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="all">All Subjects</option>
                {subjects.length > 0 ? (
                  subjects.map(subject => (
                    <option key={subject.id} value={subject.id}>{subject.name}</option>
                  ))
                ) : (
                  <>
                    <option value="math">Mathematics</option>
                    <option value="physics">Physics</option>
                    <option value="cs">Computer Science</option>
                    <option value="english">English</option>
                  </>
                )}
              </select>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>
        
        <TaskList tasks={sortedTasks} />
      </div>
      
      {isAddingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Add New Task</h2>
                <button 
                  onClick={() => setIsAddingTask(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <TaskForm 
                subjects={subjects}
                onSubmit={() => setIsAddingTask(false)}
                onCancel={() => setIsAddingTask(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskTracker;