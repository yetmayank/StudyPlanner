import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Schedule from './components/Schedule';
import TaskList from './components/TaskList';
import SubjectList from './components/SubjectList';
import type { TimeBlock } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<'schedule' | 'tasks' | 'subjects'>('subjects');
  const [schedule, setSchedule] = useState<TimeBlock[]>([]);

  const handleTabChange = (tab: 'schedule' | 'tasks' | 'subjects') => {
    setActiveTab(tab);
  };

  const handleGenerateSchedule = (blocks: TimeBlock[]) => {
    setSchedule(blocks);
    setActiveTab('schedule');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="flex-1 overflow-auto">
        {activeTab === 'schedule' ? (
          <Schedule initialBlocks={schedule} />
        ) : activeTab === 'tasks' ? (
          <TaskList />
        ) : (
          <SubjectList onGenerateSchedule={handleGenerateSchedule} />
        )}
      </main>
    </div>
  );
}

export default App;