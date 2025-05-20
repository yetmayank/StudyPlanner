import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AlarmPlus as Alarm, BookOpen, Calendar, CheckCircle, Clock, ListTodo, Plus, Target } from 'lucide-react';
import StatCard from '../components/common/StatCard';
import UpcomingEvents from '../components/dashboard/UpcomingEvents';
import TaskSummary from '../components/dashboard/TaskSummary';
import SubjectProgress from '../components/dashboard/SubjectProgress';

const Dashboard: React.FC = () => {
  const { tasks, subjects, schedules, addSubject } = useApp();
  const [isAddingSubject, setIsAddingSubject] = useState(false);
  const [newSubject, setNewSubject] = useState({
    name: '',
    color: '#3B82F6',
  });
  
  // Calculate stats
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  const upcomingExams = schedules.filter(event => 
    event.type === 'exam' && new Date(event.date) > new Date()
  ).length;
  
  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    addSubject({
      name: newSubject.name,
      color: newSubject.color,
    });
    setNewSubject({ name: '', color: '#3B82F6' });
    setIsAddingSubject(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm font-medium text-gray-500">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Tasks Completed" 
          value={completedTasks} 
          icon={<CheckCircle className="text-green-500" />} 
          change={{ value: 5, type: 'increase' }}
        />
        <StatCard 
          title="Pending Tasks" 
          value={pendingTasks} 
          icon={<ListTodo className="text-amber-500" />} 
          change={{ value: 2, type: 'decrease' }}
        />
        <StatCard 
          title="Subjects" 
          value={subjects.length} 
          icon={<BookOpen className="text-blue-500" />} 
          change={{ value: 0, type: 'neutral' }}
        />
        <StatCard 
          title="Upcoming Exams" 
          value={upcomingExams} 
          icon={<Calendar className="text-purple-500" />} 
          change={{ value: 1, type: 'increase' }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Subjects</h2>
              <button
                onClick={() => setIsAddingSubject(true)}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Subject
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {subjects.map((subject, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-gray-200 bg-white hover:shadow-md transition-shadow"
                  style={{ borderLeftColor: subject.color, borderLeftWidth: '4px' }}
                >
                  <h3 className="font-medium text-gray-900">{subject.name}</h3>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span>Added {new Date(subject.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {subjects.length === 0 && (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 mx-auto text-gray-300" />
                <p className="mt-2 text-gray-500">No subjects added yet</p>
              </div>
            )}
          </div>
          
          <UpcomingEvents />
        </div>
        
        <div className="space-y-6">
          <TaskSummary />
          <SubjectProgress />
          
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl shadow-sm p-6 text-white">
            <div className="flex items-center">
              <div className="rounded-full bg-white/20 p-3 mr-4">
                <Target className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-white">AI Study Planner</h3>
                <p className="text-white/80 text-sm mt-1">
                  Generate an optimized study schedule
                </p>
              </div>
            </div>
            <div className="mt-4">
              <button className="w-full py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100 transition">
                Create Schedule
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Reminders</h2>
              <span className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                Set Reminder
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-100">
                <div className="flex items-center">
                  <Alarm className="h-5 w-5 text-amber-500 mr-3" />
                  <span className="text-gray-700">Math assignment due</span>
                </div>
                <span className="text-xs font-medium text-gray-500">Tomorrow</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-100">
                <div className="flex items-center">
                  <Alarm className="h-5 w-5 text-purple-500 mr-3" />
                  <span className="text-gray-700">Physics exam prep</span>
                </div>
                <span className="text-xs font-medium text-gray-500">2 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {isAddingSubject && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Add New Subject</h2>
                <button 
                  onClick={() => setIsAddingSubject(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleAddSubject}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Subject Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={newSubject.name}
                      onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                      Color
                    </label>
                    <input
                      type="color"
                      id="color"
                      value={newSubject.color}
                      onChange={(e) => setNewSubject({ ...newSubject, color: e.target.value })}
                      className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsAddingSubject(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Add Subject
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;