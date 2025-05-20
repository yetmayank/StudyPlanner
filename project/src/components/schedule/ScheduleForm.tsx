import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Subject } from '../../types';

interface ScheduleFormProps {
  subjects: Subject[];
  onSubmit: () => void;
  onCancel: () => void;
  initialDate?: Date;
}

const ScheduleForm: React.FC<ScheduleFormProps> = ({ 
  subjects, 
  onSubmit, 
  onCancel,
  initialDate = new Date()
}) => {
  const { addNotification, setSchedules, schedules } = useApp();
  
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };
  
  const [formData, setFormData] = useState({
    title: '',
    type: 'class', // class, exam, assignment, study, other
    subject: subjects.length > 0 ? subjects[0].id : '',
    date: formatDate(initialDate),
    startTime: '09:00',
    endTime: '10:00',
    location: '',
    description: '',
    reminderBefore: '30', // minutes
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new schedule event
    const newEvent = {
      id: `schedule-${Date.now()}`,
      ...formData,
      createdAt: new Date().toISOString(),
    };
    
    // Add to schedules
    setSchedules([...schedules, newEvent]);
    
    // Create notification for reminder
    const eventDate = new Date(`${formData.date}T${formData.startTime}`);
    const reminderMinutes = parseInt(formData.reminderBefore, 10);
    
    addNotification({
      title: `Reminder: ${formData.title}`,
      message: `Your ${formData.type} is starting in ${reminderMinutes} minutes.`,
      type: 'reminder',
      time: new Date(eventDate.getTime() - reminderMinutes * 60000).toISOString(),
    });
    
    onSubmit();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="e.g., Math Class, Physics Exam"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Event Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          >
            <option value="class">Class</option>
            <option value="exam">Exam</option>
            <option value="assignment">Assignment</option>
            <option value="study">Study Session</option>
            <option value="other">Other</option>
          </select>
        </div>
        
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
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>
        
        <div>
          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
            Start Time
          </label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>
        
        <div>
          <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
            End Time
          </label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location (optional)
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="e.g., Room 101, Online"
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
          <option value="5">5 minutes before</option>
          <option value="15">15 minutes before</option>
          <option value="30">30 minutes before</option>
          <option value="60">1 hour before</option>
          <option value="1440">1 day before</option>
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
          Save Event
        </button>
      </div>
    </form>
  );
};

export default ScheduleForm;