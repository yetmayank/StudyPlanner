import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Schedule } from '../../types';

interface CalendarViewProps {
  currentView: 'day' | 'week' | 'month';
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  schedules: Schedule[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ 
  currentView, 
  selectedDate, 
  setSelectedDate,
  schedules 
}) => {
  const navigatePrevious = () => {
    const newDate = new Date(selectedDate);
    if (currentView === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (currentView === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setSelectedDate(newDate);
  };

  const navigateNext = () => {
    const newDate = new Date(selectedDate);
    if (currentView === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    } else if (currentView === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setSelectedDate(newDate);
  };

  const formatDateRange = () => {
    if (currentView === 'day') {
      return selectedDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } else if (currentView === 'week') {
      const startOfWeek = new Date(selectedDate);
      const day = selectedDate.getDay();
      const diff = selectedDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
      startOfWeek.setDate(diff);
      
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 6);
      
      const startMonth = startOfWeek.toLocaleDateString('en-US', { month: 'short' });
      const endMonth = endOfWeek.toLocaleDateString('en-US', { month: 'short' });
      const startDay = startOfWeek.getDate();
      const endDay = endOfWeek.getDate();
      const year = selectedDate.getFullYear();
      
      if (startMonth === endMonth) {
        return `${startMonth} ${startDay} - ${endDay}, ${year}`;
      }
      return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
    } else {
      return selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    }
  };

  // Rendering logic depends on the current view
  const renderCalendarView = () => {
    if (currentView === 'day') {
      return renderDayView();
    } else if (currentView === 'week') {
      return renderWeekView();
    } else {
      return renderMonthView();
    }
  };

  const renderDayView = () => {
    const hours = Array.from({ length: 14 }, (_, i) => i + 7); // 7 AM to 8 PM
    
    // Filter events for the selected day
    const filteredEvents = schedules.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === selectedDate.getDate() &&
        eventDate.getMonth() === selectedDate.getMonth() &&
        eventDate.getFullYear() === selectedDate.getFullYear()
      );
    });
    
    return (
      <div className="min-h-96 relative">
        <div className="grid grid-cols-[60px_1fr] h-full">
          <div className="border-r border-gray-200">
            {hours.map((hour) => (
              <div key={hour} className="h-20 border-b border-gray-200 text-center pt-1">
                <span className="text-xs text-gray-500">
                  {hour % 12 === 0 ? 12 : hour % 12} {hour >= 12 ? 'PM' : 'AM'}
                </span>
              </div>
            ))}
          </div>
          
          <div className="relative">
            {hours.map((hour) => (
              <div key={hour} className="h-20 border-b border-gray-200"></div>
            ))}
            
            {filteredEvents.map((event, index) => {
              const [startHour, startMinute] = event.startTime.split(':').map(Number);
              const [endHour, endMinute] = event.endTime.split(':').map(Number);
              
              const startPosition = (startHour - 7) * 80 + (startMinute / 60) * 80;
              const duration = ((endHour - startHour) * 60 + (endMinute - startMinute)) / 60 * 80;
              
              let bgColor = 'bg-blue-100 border-blue-300';
              let textColor = 'text-blue-800';
              
              if (event.type === 'exam') {
                bgColor = 'bg-red-100 border-red-300';
                textColor = 'text-red-800';
              } else if (event.type === 'assignment') {
                bgColor = 'bg-amber-100 border-amber-300';
                textColor = 'text-amber-800';
              }
              
              return (
                <div
                  key={index}
                  className={`absolute left-1 right-2 rounded-lg border p-2 ${bgColor}`}
                  style={{
                    top: `${startPosition}px`,
                    height: `${duration}px`,
                    minHeight: '30px',
                  }}
                >
                  <p className={`font-medium text-sm ${textColor}`}>{event.title}</p>
                  <p className="text-xs text-gray-600">{event.startTime} - {event.endTime}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const startOfWeek = new Date(selectedDate);
    const day = selectedDate.getDay();
    const diff = selectedDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
    startOfWeek.setDate(diff);
    
    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(date.getDate() + i);
      return date;
    });
    
    const hours = Array.from({ length: 14 }, (_, i) => i + 7); // 7 AM to 8 PM
    
    return (
      <div className="min-h-96 overflow-x-auto">
        <div className="grid grid-cols-[60px_repeat(7,_1fr)] min-w-[800px] h-full">
          <div className="border-r border-gray-200"></div>
          {weekDays.map((date, i) => (
            <div key={i} className="border-r border-gray-200 px-2 py-3 text-center">
              <p className="text-xs text-gray-500 font-medium">
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
              </p>
              <p className={`text-lg font-semibold ${
                date.getDate() === new Date().getDate() &&
                date.getMonth() === new Date().getMonth() &&
                date.getFullYear() === new Date().getFullYear()
                  ? 'text-blue-600'
                  : 'text-gray-900'
              }`}>
                {date.getDate()}
              </p>
            </div>
          ))}
          
          <div className="border-r border-gray-200">
            {hours.map((hour) => (
              <div key={hour} className="h-20 border-b border-gray-200 text-center pt-1">
                <span className="text-xs text-gray-500">
                  {hour % 12 === 0 ? 12 : hour % 12} {hour >= 12 ? 'PM' : 'AM'}
                </span>
              </div>
            ))}
          </div>
          
          {weekDays.map((date, dayIndex) => (
            <div key={dayIndex} className="relative border-r border-gray-200">
              {hours.map((hour) => (
                <div key={hour} className="h-20 border-b border-gray-200"></div>
              ))}
              
              {schedules
                .filter(event => {
                  const eventDate = new Date(event.date);
                  return (
                    eventDate.getDate() === date.getDate() &&
                    eventDate.getMonth() === date.getMonth() &&
                    eventDate.getFullYear() === date.getFullYear()
                  );
                })
                .map((event, index) => {
                  const [startHour, startMinute] = event.startTime.split(':').map(Number);
                  const [endHour, endMinute] = event.endTime.split(':').map(Number);
                  
                  const startPosition = (startHour - 7) * 80 + (startMinute / 60) * 80;
                  const duration = ((endHour - startHour) * 60 + (endMinute - startMinute)) / 60 * 80;
                  
                  let bgColor = 'bg-blue-100 border-blue-300';
                  let textColor = 'text-blue-800';
                  
                  if (event.type === 'exam') {
                    bgColor = 'bg-red-100 border-red-300';
                    textColor = 'text-red-800';
                  } else if (event.type === 'assignment') {
                    bgColor = 'bg-amber-100 border-amber-300';
                    textColor = 'text-amber-800';
                  }
                  
                  return (
                    <div
                      key={index}
                      className={`absolute left-1 right-1 rounded-lg border p-1 ${bgColor}`}
                      style={{
                        top: `${startPosition}px`,
                        height: `${duration}px`,
                        minHeight: '20px',
                        overflow: 'hidden',
                      }}
                    >
                      <p className={`font-medium text-xs truncate ${textColor}`}>{event.title}</p>
                      <p className="text-xs text-gray-600 truncate">{event.startTime} - {event.endTime}</p>
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    // Calculate how many rows we need (maximum 6 weeks)
    const totalDaysToDisplay = daysInMonth + startingDay;
    const totalRows = Math.ceil(totalDaysToDisplay / 7);
    
    // Create array of day cells
    const dayCells = [];
    let dayCounter = 1;
    
    for (let row = 0; row < totalRows; row++) {
      const weekRow = [];
      
      for (let col = 0; col < 7; col++) {
        // Skip days from previous month
        if (row === 0 && col < startingDay) {
          weekRow.push(null);
          continue;
        }
        
        // Skip days from next month
        if (dayCounter > daysInMonth) {
          weekRow.push(null);
          continue;
        }
        
        // Current month's day
        const currentDate = new Date(year, month, dayCounter);
        
        // Get events for this day
        const dayEvents = schedules.filter(event => {
          const eventDate = new Date(event.date);
          return (
            eventDate.getDate() === currentDate.getDate() &&
            eventDate.getMonth() === currentDate.getMonth() &&
            eventDate.getFullYear() === currentDate.getFullYear()
          );
        });
        
        weekRow.push({
          day: dayCounter,
          isToday: 
            currentDate.getDate() === new Date().getDate() &&
            currentDate.getMonth() === new Date().getMonth() &&
            currentDate.getFullYear() === new Date().getFullYear(),
          events: dayEvents,
        });
        
        dayCounter++;
      }
      
      dayCells.push(weekRow);
    }
    
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    return (
      <div>
        <div className="grid grid-cols-7 text-center border-b border-gray-200">
          {weekDays.map((day, i) => (
            <div key={i} className="py-2">
              <span className="text-sm font-medium text-gray-500">{day}</span>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 grid-rows-6 h-full">
          {dayCells.flat().map((cell, i) => (
            <div
              key={i}
              className={`min-h-[100px] p-2 border-b border-r border-gray-200 ${
                !cell ? 'bg-gray-50' : ''
              }`}
            >
              {cell && (
                <>
                  <p className={`text-sm font-medium mb-1 ${
                    cell.isToday ? 'text-white bg-blue-600 rounded-full w-6 h-6 flex items-center justify-center' : 'text-gray-700'
                  }`}>
                    {cell.day}
                  </p>
                  <div className="space-y-1 overflow-y-auto max-h-[calc(100%-24px)]">
                    {cell.events.slice(0, 3).map((event, j) => {
                      let bgColor = 'bg-blue-100 text-blue-800';
                      
                      if (event.type === 'exam') {
                        bgColor = 'bg-red-100 text-red-800';
                      } else if (event.type === 'assignment') {
                        bgColor = 'bg-amber-100 text-amber-800';
                      }
                      
                      return (
                        <div
                          key={j}
                          className={`px-1 py-0.5 rounded text-xs truncate ${bgColor}`}
                        >
                          {event.title}
                        </div>
                      );
                    })}
                    
                    {cell.events.length > 3 && (
                      <p className="text-xs text-gray-500 font-medium">
                        +{cell.events.length - 3} more
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-2">
          <button
            onClick={navigatePrevious}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={() => setSelectedDate(new Date())}
            className="px-3 py-1 rounded-md text-sm font-medium text-blue-600 hover:bg-blue-50"
          >
            Today
          </button>
          <button
            onClick={navigateNext}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900 ml-2">
            {formatDateRange()}
          </h2>
        </div>
      </div>
      
      {renderCalendarView()}
    </div>
  );
};

export default CalendarView;