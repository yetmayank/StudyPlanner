import React from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Calendar, Clock } from 'lucide-react';

const UpcomingEvents: React.FC = () => {
  const { schedules } = useApp();
  
  // Get upcoming events (next 7 days)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);
  
  const upcomingEvents = schedules
    .filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= today && eventDate <= nextWeek;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
        <span className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
          View All
        </span>
      </div>
      
      {upcomingEvents.length > 0 ? (
        <div className="space-y-4">
          {upcomingEvents.map((event, index) => {
            const eventDate = new Date(event.date);
            const isToday = eventDate.toDateString() === today.toDateString();
            
            let borderColor = 'border-gray-200';
            let bgColor = 'bg-white';
            let iconBg = 'bg-gray-100';
            let iconColor = 'text-gray-500';
            
            if (event.type === 'exam') {
              borderColor = 'border-red-200';
              bgColor = 'bg-red-50';
              iconBg = 'bg-red-100';
              iconColor = 'text-red-500';
            } else if (event.type === 'assignment') {
              borderColor = 'border-amber-200';
              bgColor = 'bg-amber-50';
              iconBg = 'bg-amber-100';
              iconColor = 'text-amber-500';
            } else if (event.type === 'class') {
              borderColor = 'border-blue-200';
              bgColor = 'bg-blue-50';
              iconBg = 'bg-blue-100';
              iconColor = 'text-blue-500';
            }
            
            return (
              <div 
                key={index} 
                className={`flex border rounded-lg overflow-hidden ${borderColor} ${bgColor}`}
              >
                <div className="w-20 flex-shrink-0 flex flex-col items-center justify-center py-3 border-r border-gray-200">
                  <span className="text-xs font-medium text-gray-500">
                    {eventDate.toLocaleDateString('en-US', { month: 'short' })}
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    {eventDate.getDate()}
                  </span>
                  <span className="text-xs font-medium text-gray-500">
                    {eventDate.toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                </div>
                <div className="flex-1 p-4">
                  <div className="flex items-start">
                    <div className={`rounded-full p-2 mr-3 ${iconBg}`}>
                      {event.type === 'exam' && <BookOpen size={16} className={iconColor} />}
                      {event.type === 'assignment' && <Calendar size={16} className={iconColor} />}
                      {event.type === 'class' && <Clock size={16} className={iconColor} />}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{event.title}</h4>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <Clock size={14} className="mr-1" />
                        <span>
                          {event.startTime} - {event.endTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {isToday && (
                  <div className="w-1.5 bg-blue-500 h-full"></div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-10">
          <Calendar className="h-12 w-12 mx-auto text-gray-300" />
          <p className="mt-2 text-gray-500">No upcoming events</p>
          <button className="mt-3 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-200 transition">
            Add New Event
          </button>
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;