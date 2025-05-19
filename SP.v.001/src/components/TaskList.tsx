import React, { useState } from 'react';
import { Plus, Circle, CheckCircle, Clock, AlertCircle, X, Trash2 } from 'lucide-react';
import type { Task } from '../types';

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete Math Assignment',
    subject: 'Mathematics',
    dueDate: '2024-03-20',
    priority: 'high',
    completed: false
  },
  {
    id: '2',
    title: 'Review Physics Notes',
    subject: 'Physics',
    dueDate: '2024-03-21',
    priority: 'medium',
    completed: false
  }
];

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState<Omit<Task, 'id' | 'completed'>>({
    title: '',
    subject: '',
    dueDate: '',
    priority: 'medium'
  });

  const getPriorityIcon = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'medium':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'low':
        return <Circle className="w-4 h-4 text-green-500" />;
    }
  };

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const removeTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleAddTask = () => {
    if (!newTask.title || !newTask.subject || !newTask.dueDate) return;

    const task: Task = {
      id: Date.now().toString(),
      ...newTask,
      completed: false
    };

    setTasks([...tasks, task]);
    setIsAddingTask(false);
    setNewTask({
      title: '',
      subject: '',
      dueDate: '',
      priority: 'medium'
    });
  };

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Tasks</h2>
        <button
          onClick={() => setIsAddingTask(true)}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4" />
          <span>Add Task</span>
        </button>
      </div>

      {isAddingTask && (
        <div className="bg-white rounded-lg shadow mb-6 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">New Task</h3>
            <button
              onClick={() => setIsAddingTask(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter task title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                value={newTask.subject}
                onChange={(e) => setNewTask({ ...newTask, subject: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter subject"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Task['priority'] })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <button
              onClick={handleAddTask}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Add Task
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        {tasks.map(task => (
          <div
            key={task.id}
            className="p-4 border-b last:border-b-0 flex items-center space-x-4"
          >
            <button
              onClick={() => toggleTask(task.id)}
              className="flex-shrink-0"
            >
              {task.completed ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <Circle className="w-6 h-6 text-gray-300" />
              )}
            </button>
            
            <div className="flex-1">
              <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {task.title}
              </h3>
              <div className="text-sm text-gray-500">{task.subject}</div>
            </div>

            <div className="flex items-center space-x-4">
              {getPriorityIcon(task.priority)}
              <span className="text-sm text-gray-500">{task.dueDate}</span>
              <button
                onClick={() => removeTask(task.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}