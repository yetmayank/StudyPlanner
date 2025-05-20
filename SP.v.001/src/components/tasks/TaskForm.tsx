import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Subject } from '../../types';

interface TaskFormProps {
  subjects: Subject[];
  onSubmit: () => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ subjects, onSubmit, onCancel }) => {
  const { addTask, addNotification } = useApp();
  
  const today = new Date().toISOString().split('T')[0];
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: subjects.length > 0 ? subjects[0].id : 'math',
    dueDate: today,
    status: 'pending',
    priority: 'medium',
    estimatedTime: '30', // minutes
    reminderBefore: '1', // days
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new task
    addTask({
      title: formData.title,
      description: formData.description,
      subject: formData.subject,
      dueDate: formData.dueDate,
      status: formData.status as 'pending' | 'in-progress' | 'completed',
      priority: formData.priority as 'low' | 'medium' | 'high',
      estimatedTime: parseInt(formData.estimatedTime),
    });
    
    // Create notification for reminder
    const dueDate = new Date(formData.dueDate);
    const reminderDays = parseInt(formData.reminderBefore, 10);
    
    addNotification({
      title: `Task Due Soon: ${formData.title}`,
      message: `Your ${formData.subject} task is due in ${reminderDays} day${reminderDays > 1 ? 's' : ''}.`,
      type: 'task',
      time: new Date(dueDate.getTime() - reminderDays * 24 * 60 * 60 * 1000).toISOString(),
    });
    
    onSubmit();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Task Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="e.g., Complete Math Assignment"
          required
        />
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description (optional)
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Add any additional details here..."
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          >
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
                <option value="other">Other</option>
              </>
            )}
          </select>
        </div>
        
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            min={today}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="estimatedTime" className="block text-sm font-medium text-gray-700">
            Estimated Time (minutes)
          </label>
          <input
            type="number"
            id="estimatedTime"
            name="estimatedTime"
            value={formData.estimatedTime}
            onChange={handleChange}
            min="5"
            max="480"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="reminderBefore" className="block text-sm font-medium text-gray-700">
          Reminder
        </label>
        <select
          id="reminderBefore"
          name="reminderBefore"
          value={formData.reminderBefore}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          <option value="0">On due date</option>
          <option value="1">1 day before</option>
          <option value="2">2 days before</option>
          <option value="3">3 days before</option>
          <option value="7">1 week before</option>
        </select>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;