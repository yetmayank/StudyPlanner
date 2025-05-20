import React from 'react';
import { useApp } from '../../context/AppContext';
import { Task } from '../../types';
import { CheckCircle, Circle, Clock, Flag } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const { updateTask } = useApp();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Flag size={14} className="text-red-500" />;
      case 'medium':
        return <Flag size={14} className="text-amber-500" />;
      default:
        return <Flag size={14} className="text-blue-500" />;
    }
  };
  
  const isTaskOverdue = (dueDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const taskDate = new Date(dueDate);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate < today;
  };
  
  const formatDueDate = (dueDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const taskDate = new Date(dueDate);
    taskDate.setHours(0, 0, 0, 0);
    
    if (taskDate.getTime() === today.getTime()) {
      return 'Today';
    }
    
    if (taskDate.getTime() === tomorrow.getTime()) {
      return 'Tomorrow';
    }
    
    return taskDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };
  
  const toggleTaskStatus = (task: Task) => {
    updateTask({
      ...task,
      status: task.status === 'completed' ? 'pending' : 'completed',
    });
  };
  
  return (
    <div className="overflow-hidden">
      {tasks.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Task
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tasks.map((task) => {
                const isOverdue = isTaskOverdue(task.dueDate) && task.status !== 'completed';
                
                return (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleTaskStatus(task)}
                        className="focus:outline-none"
                      >
                        {task.status === 'completed' ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <Circle className="h-5 w-5 text-gray-300 hover:text-gray-400" />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className={`text-sm font-medium ${task.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                          {task.title}
                        </span>
                        {task.description && (
                          <span className="text-xs text-gray-500 mt-1">
                            {task.description}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-md bg-purple-100 text-purple-800">
                        {task.subject}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isOverdue ? (
                        <div className="flex items-center text-xs font-medium text-red-500">
                          <Clock size={14} className="mr-1" />
                          <span>Overdue ({formatDueDate(task.dueDate)})</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">
                          {formatDueDate(task.dueDate)}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getPriorityIcon(task.priority)}
                        <span className="ml-1 text-xs">
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks</h3>
          <p className="mt-1 text-sm text-gray-500">
            Create a new task to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskList;