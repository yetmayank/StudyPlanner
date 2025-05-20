import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, Plus } from 'lucide-react';
import CalendarView from '../components/schedule/CalendarView';
import ScheduleForm from '../components/schedule/ScheduleForm';

const ScheduleManager: React.FC = () => {
  const { schedules, subjects } = useApp();
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [currentView, setCurrentView] = useState<'day' | 'week' | 'month'>('week');
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Schedule Manager</h1>
        
        <div className="flex items-center space-x-2">
          <div className="bg-white rounded-lg border border-gray-200 p-1 flex">
            <button 
              onClick={() => setCurrentView('day')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                currentView === 'day' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Day
            </button>
            <button 
              onClick={() => setCurrentView('week')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                currentView === 'week' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Week
            </button>
            <button 
              onClick={() => setCurrentView('month')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                currentView === 'month' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Month
            </button>
          </div>
          
          <button
            onClick={() => setIsAddingEvent(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <CalendarView 
          currentView={currentView} 
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          schedules={schedules}
        />
      </div>
      
      {isAddingEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Add New Event</h2>
                <button 
                  onClick={() => setIsAddingEvent(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <ScheduleForm 
                subjects={subjects}
                onSubmit={() => setIsAddingEvent(false)}
                onCancel={() => setIsAddingEvent(false)}
                initialDate={selectedDate}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleManager;