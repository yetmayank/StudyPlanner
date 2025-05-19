import React, { useState, useEffect } from 'react';
import { Plus, X, Trash2 } from 'lucide-react';
import type { TimeBlock } from '../types';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const HOURS = Array.from({ length: 14 }, (_, i) => i + 8); // 8 AM to 9 PM

interface ScheduleProps {
  initialBlocks?: TimeBlock[];
}

export default function Schedule({ initialBlocks = [] }: ScheduleProps) {
  const [schedule, setSchedule] = useState<TimeBlock[]>(initialBlocks);
  const [isAddingBlock, setIsAddingBlock] = useState(false);
  const [newBlock, setNewBlock] = useState<Omit<TimeBlock, 'id'>>({
    day: 'Monday',
    startTime: '09:00',
    endTime: '10:30',
    subject: '',
    type: 'class'
  });

  useEffect(() => {
    if (initialBlocks.length > 0) {
      setSchedule(initialBlocks);
    }
  }, [initialBlocks]);

  const handleAddBlock = () => {
    if (!newBlock.subject) return;

    const block: TimeBlock = {
      id: Date.now().toString(),
      ...newBlock
    };

    setSchedule([...schedule, block]);
    setIsAddingBlock(false);
    setNewBlock({
      day: 'Monday',
      startTime: '09:00',
      endTime: '10:30',
      subject: '',
      type: 'class'
    });
  };

  const removeBlock = (blockId: string) => {
    setSchedule(schedule.filter(block => block.id !== blockId));
  };

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Weekly Schedule</h2>
        <button
          onClick={() => setIsAddingBlock(true)}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4" />
          <span>Add Block</span>
        </button>
      </div>

      {isAddingBlock && (
        <div className="bg-white rounded-lg shadow mb-6 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">New Schedule Block</h3>
            <button
              onClick={() => setIsAddingBlock(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                value={newBlock.subject}
                onChange={(e) => setNewBlock({ ...newBlock, subject: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter subject name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Day
              </label>
              <select
                value={newBlock.day}
                onChange={(e) => setNewBlock({ ...newBlock, day: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              >
                {DAYS.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  value={newBlock.startTime}
                  onChange={(e) => setNewBlock({ ...newBlock, startTime: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Time
                </label>
                <input
                  type="time"
                  value={newBlock.endTime}
                  onChange={(e) => setNewBlock({ ...newBlock, endTime: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={newBlock.type}
                onChange={(e) => setNewBlock({ ...newBlock, type: e.target.value as TimeBlock['type'] })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="class">Class</option>
                <option value="study">Study</option>
                <option value="break">Break</option>
              </select>
            </div>
            <button
              onClick={handleAddBlock}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Add Block
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <div className="min-w-[1000px]">
          <div className="grid grid-cols-8 border-b">
            <div className="p-4 font-medium text-gray-500">Time</div>
            {DAYS.map(day => (
              <div key={day} className="p-4 font-medium text-gray-500">{day}</div>
            ))}
          </div>

          <div className="relative">
            {HOURS.map(hour => (
              <div key={hour} className="grid grid-cols-8 border-b">
                <div className="p-4 text-sm text-gray-500">
                  {`${hour.toString().padStart(2, '0')}:00`}
                </div>
                {DAYS.map(day => (
                  <div key={`${day}-${hour}`} className="border-l p-2 min-h-[60px]">
                    {schedule
                      .filter(block => 
                        block.day === day && 
                        parseInt(block.startTime.split(':')[0]) === hour
                      )
                      .map(block => (
                        <div
                          key={block.id}
                          className={`rounded-lg p-2 text-sm ${
                            block.type === 'class' 
                              ? 'bg-blue-100 text-blue-800' 
                              : block.type === 'study'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-orange-100 text-orange-800'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">{block.subject}</div>
                              <div>{`${block.startTime} - ${block.endTime}`}</div>
                            </div>
                            <button
                              onClick={() => removeBlock(block.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}