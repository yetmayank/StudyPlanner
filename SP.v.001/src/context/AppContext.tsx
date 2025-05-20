import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Task, Subject, Schedule, SchedulePreference, Notification } from '../types';

interface AppContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  subjects: Subject[];
  setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>;
  schedules: Schedule[];
  setSchedules: React.Dispatch<React.SetStateAction<Schedule[]>>;
  schedulePreferences: SchedulePreference;
  setSchedulePreferences: React.Dispatch<React.SetStateAction<SchedulePreference>>;
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  addTask: (task: Omit<Task, 'id'>) => void;
  removeTask: (id: string) => void;
  updateTask: (task: Task) => void;
  addSubject: (subject: Omit<Subject, 'id'>) => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  markNotificationAsRead: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [schedulePreferences, setSchedulePreferences] = useState<SchedulePreference>({
    dailyStudyHours: 4,
    sleepHours: { start: '22:00', end: '06:00' },
    schoolHours: { start: '08:00', end: '14:00' },
    breakFrequency: 50, // minutes
    breakDuration: 10, // minutes
    mealTimes: [
      { name: 'Breakfast', time: '07:00' },
      { name: 'Lunch', time: '12:00' },
      { name: 'Dinner', time: '19:00' },
    ],
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const addTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const addSubject = (subjectData: Omit<Subject, 'id'>) => {
    const newSubject: Subject = {
      ...subjectData,
      id: `subject-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setSubjects([...subjects, newSubject]);
  };

  const addNotification = (notificationData: Omit<Notification, 'id'>) => {
    const newNotification: Notification = {
      ...notificationData,
      id: `notification-${Date.now()}`,
      createdAt: new Date().toISOString(),
      read: false,
    };
    setNotifications([newNotification, ...notifications]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const value = {
    sidebarOpen,
    toggleSidebar,
    tasks,
    setTasks,
    subjects,
    setSubjects,
    schedules,
    setSchedules,
    schedulePreferences,
    setSchedulePreferences,
    notifications,
    setNotifications,
    addTask,
    removeTask,
    updateTask,
    addSubject,
    addNotification,
    markNotificationAsRead,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};