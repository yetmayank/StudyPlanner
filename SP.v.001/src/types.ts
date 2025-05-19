export interface Task {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}

export interface TimeBlock {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  subject: string;
  type: 'study' | 'break' | 'class';
}

export interface Subject {
  id: string;
  name: string;
  color: string;
  hoursPerWeek: number;
}