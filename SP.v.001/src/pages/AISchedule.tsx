import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bot, Sparkles } from 'lucide-react';
import TimeRangeInput from '../components/schedule/TimeRangeInput';

const AISchedule: React.FC = () => {
  const { schedulePreferences, setSchedulePreferences, subjects, tasks, schedules } = useApp();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSchedule, setGeneratedSchedule] = useState<any>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'dailyStudyHours') {
      setSchedulePreferences({
        ...schedulePreferences,
        [name]: parseInt(value),
      });
    } else if (name === 'breakFrequency' || name === 'breakDuration') {
      setSchedulePreferences({
        ...schedulePreferences,
        [name]: parseInt(value),
      });
    } else {
      setSchedulePreferences({
        ...schedulePreferences,
        [name]: value,
      });
    }
  };
  
  const handleSleepTimeChange = (range: { start: string; end: string }) => {
    setSchedulePreferences({
      ...schedulePreferences,
      sleepHours: range,
    });
  };
  
  const handleMealTimeChange = (index: number, time: string) => {
    const updatedMeals = [...schedulePreferences.mealTimes];
    updatedMeals[index] = { ...updatedMeals[index], time };
    
    setSchedulePreferences({
      ...schedulePreferences,
      mealTimes: updatedMeals,
    });
  };

  const handleSchoolTimeChange = (range: { start: string; end: string }) => {
    setSchedulePreferences({
      ...schedulePreferences,
      schoolHours: range,
    });
  };
  
  const generateSchedule = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const mockSchedule = {
        weekdays: generateMockWeekdaySchedule(),
        weekends: generateMockWeekendSchedule(),
      };
      
      setGeneratedSchedule(mockSchedule);
      setIsGenerating(false);
    }, 2000);
  };
  
  const generateMockWeekdaySchedule = () => {
    const { sleepHours, mealTimes, schoolHours, dailyStudyHours } = schedulePreferences;
    
    const subjectsMock = subjects.length > 0 ? subjects : [
      { id: 'math', name: 'Mathematics' },
      { id: 'physics', name: 'Physics' },
      { id: 'cs', name: 'Computer Science' },
      { id: 'english', name: 'English' },
    ];
    
    return [
      { time: '06:00 - 06:30', activity: 'Wake up & Morning Routine' },
      { time: mealTimes[0].time + ' - ' + (parseInt(mealTimes[0].time.split(':')[0]) + 1) + ':00', activity: 'Breakfast' },
      { time: schoolHours.start + ' - ' + schoolHours.end, activity: 'School/College' },
      { time: mealTimes[1].time + ' - ' + (parseInt(mealTimes[1].time.split(':')[0]) + 1) + ':00', activity: 'Lunch' },
      { time: '15:30 - 16:00', activity: 'Short Break & Snack' },
      { time: '16:00 - 17:30', activity: `Study: ${subjectsMock[0].name}` },
      { time: mealTimes[2].time + ' - ' + (parseInt(mealTimes[2].time.split(':')[0]) + 1) + ':00', activity: 'Dinner' },
      { time: '20:00 - 21:30', activity: `Study: ${subjectsMock[1].name}` },
      { time: '21:30 - 22:00', activity: 'Prepare for Next Day' },
      { time: sleepHours.start + ' - ' + sleepHours.end, activity: 'Sleep' },
    ];
  };
  
  const generateMockWeekendSchedule = () => {
    const { sleepHours, mealTimes, dailyStudyHours } = schedulePreferences;
    
    const subjectsMock = subjects.length > 0 ? subjects : [
      { id: 'math', name: 'Mathematics' },
      { id: 'physics', name: 'Physics' },
      { id: 'cs', name: 'Computer Science' },
      { id: 'english', name: 'English' },
    ];
    
    return [
      { time: '07:00 - 07:30', activity: 'Wake up & Morning Routine' },
      { time: '07:30 - 08:00', activity: 'Breakfast' },
      { time: '08:30 - 10:30', activity: `Study: ${subjectsMock[0].name}` },
      { time: '10:30 - 11:00', activity: 'Short Break' },
      { time: '11:00 - 13:00', activity: `Study: ${subjectsMock[1].name}` },
      { time: '13:00 - 14:00', activity: 'Lunch' },
      { time: '14:00 - 16:00', activity: 'Free Time/Hobbies' },
      { time: '16:00 - 17:30', activity: `Study: ${subjectsMock[2].name}` },
      { time: '17:30 - 19:00', activity: 'Exercise' },
      { time: '19:00 - 20:00', activity: 'Dinner' },
      { time: '20:00 - 21:30', activity: 'Family Time' },
      { time: '21:30 - 22:30', activity: 'Review Weekly Progress & Plan Next Week' },
      { time: '22:30 - 08:00', activity: 'Sleep' },
    ];
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Schedule Generator</h1>
          <p className="text-gray-500 mt-1">
            Customize your preferences to generate a personalized study schedule
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Preferences</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Daily Study Hours
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    name="dailyStudyHours"
                    value={schedulePreferences.dailyStudyHours}
                    onChange={handleChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 hour</span>
                    <span>{schedulePreferences.dailyStudyHours} hours</span>
                    <span>8 hours</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sleep Schedule
                  </label>
                  <TimeRangeInput
                    range={schedulePreferences.sleepHours}
                    onChange={handleSleepTimeChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    School/College Hours
                  </label>
                  <TimeRangeInput
                    range={schedulePreferences.schoolHours || { start: '08:00', end: '14:00' }}
                    onChange={handleSchoolTimeChange}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Break Frequency (minutes of study)
                  </label>
                  <select
                    name="breakFrequency"
                    value={schedulePreferences.breakFrequency}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="25">Every 25 minutes (Pomodoro)</option>
                    <option value="50">Every 50 minutes</option>
                    <option value="90">Every 90 minutes</option>
                    <option value="120">Every 2 hours</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Break Duration (minutes)
                  </label>
                  <select
                    name="breakDuration"
                    value={schedulePreferences.breakDuration}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="5">5 minutes</option>
                    <option value="10">10 minutes</option>
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Meal Times
                  </label>
                  <div className="space-y-3">
                    {schedulePreferences.mealTimes.map((meal, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600 w-20">{meal.name}:</span>
                        <input
                          type="time"
                          value={meal.time}
                          onChange={(e) => handleMealTimeChange(index, e.target.value)}
                          className="block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  onClick={generateSchedule}
                  disabled={isGenerating}
                  className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    isGenerating ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate AI Schedule
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          {generatedSchedule ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Your Personalized Schedule</h2>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1.5 text-sm font-medium bg-blue-100 text-blue-700 rounded-md">
                      Edit
                    </button>
                    <button className="px-3 py-1.5 text-sm font-medium bg-green-100 text-green-700 rounded-md">
                      Save
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-4">Weekday Schedule</h3>
                    <div className="space-y-3">
                      {generatedSchedule.weekdays.map((block: any, index: number) => (
                        <div 
                          key={index}
                          className={`p-3 rounded-lg border ${
                            block.activity.includes('Study') 
                              ? 'bg-blue-50 border-blue-200' 
                              : block.activity.includes('Sleep')
                                ? 'bg-indigo-50 border-indigo-200'
                                : block.activity.includes('Break') || block.activity.includes('Recreation')
                                  ? 'bg-green-50 border-green-200'
                                  : block.activity.includes('Breakfast') || block.activity.includes('Lunch') || block.activity.includes('Dinner')
                                    ? 'bg-amber-50 border-amber-200'
                                    : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-900">{block.time}</span>
                            <span className="text-sm text-gray-600">{block.duration}</span>
                          </div>
                          <p className="mt-1 text-sm">{block.activity}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-4">Weekend Schedule</h3>
                    <div className="space-y-3">
                      {generatedSchedule.weekends.map((block: any, index: number) => (
                        <div 
                          key={index}
                          className={`p-3 rounded-lg border ${
                            block.activity.includes('Study') 
                              ? 'bg-blue-50 border-blue-200' 
                              : block.activity.includes('Sleep')
                                ? 'bg-indigo-50 border-indigo-200'
                                : block.activity.includes('Break') || block.activity.includes('Free Time') || block.activity.includes('Recreation')
                                  ? 'bg-green-50 border-green-200'
                                  : block.activity.includes('Breakfast') || block.activity.includes('Lunch') || block.activity.includes('Dinner')
                                    ? 'bg-amber-50 border-amber-200'
                                    : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-900">{block.time}</span>
                            <span className="text-sm text-gray-600">{block.duration}</span>
                          </div>
                          <p className="mt-1 text-sm">{block.activity}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Bot className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">AI Scheduler Notes</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>This schedule is optimized based on your preferences. Here are some key insights:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>Your most productive hours are allocated to more challenging subjects</li>
                          <li>Regular breaks are scheduled to maximize retention and reduce fatigue</li>
                          <li>Study sessions are aligned with your upcoming assignments and exams</li>
                          <li>Weekend schedule includes more flexibility while maintaining study objectives</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 text-center">
                <div className="mx-auto w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bot className="h-12 w-12 text-blue-600" />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-gray-900">
                  Let AI Optimize Your Study Schedule
                </h2>
                <p className="mt-2 text-gray-500 max-w-md mx-auto">
                  Our AI will create a personalized study schedule based on your preferences,
                  subjects, upcoming exams, and assignments.
                </p>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 mr-3">
                      <span className="text-blue-600 font-medium">1</span>
                    </div>
                    <p className="text-gray-700 text-left">Set your preferences</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 mr-3">
                      <span className="text-blue-600 font-medium">2</span>
                    </div>
                    <p className="text-gray-700 text-left">Click generate for AI to create your schedule</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 mr-3">
                      <span className="text-blue-600 font-medium">3</span>
                    </div>
                    <p className="text-gray-700 text-left">Edit and save your personalized schedule</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AISchedule;