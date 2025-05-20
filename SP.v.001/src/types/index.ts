export interface Task {
  id: string;
  title: string;
  description?: string;
  subject: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  estimatedTime?: number; // in minutes
  createdAt: string;
}

export interface Subject {
  id: string;
  name: string;
  color?: string;
  teacher?: string;
  location?: string;
  createdAt: string;
}

export interface Schedule {
  id: string;
  title: string;
  type: 'class' | 'exam' | 'assignment' | 'study' | 'other';
  subject: string;
  date: string;
  startTime: string;
  endTime: string;
  location?: string;
  description?: string;
  reminderBefore?: string; // minutes
  createdAt: string;
}

export interface SchedulePreference {
  dailyStudyHours: number;
  sleepHours: {
    start: string; // HH:MM format
    end: string; // HH:MM format
  };
  schoolHours: {
    start: string; // HH:MM format
    end: string; // HH:MM format
  };
  breakFrequency: number; // minutes of study before break
  breakDuration: number; // minutes
  mealTimes: Array<{
    name: string;
    time: string; // HH:MM format
  }>;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'task' | 'exam' | 'class' | 'reminder' | 'other';
  time: string;
  read: boolean;
  createdAt: string;
}