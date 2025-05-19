import React, { useState } from 'react';
import { Plus, X, Trash2, Wand2 } from 'lucide-react';
import type { Subject, TimeBlock } from '../types';
import { GoogleGenerativeAI } from '@google/generative-ai';

const COLORS = [
  'bg-red-100 text-red-800',
  'bg-blue-100 text-blue-800',
  'bg-green-100 text-green-800',
  'bg-yellow-100 text-yellow-800',
  'bg-purple-100 text-purple-800',
  'bg-pink-100 text-pink-800',
];

interface SubjectListProps {
  onGenerateSchedule: (blocks: TimeBlock[]) => void;
}

export default function SubjectList({ onGenerateSchedule }: SubjectListProps) {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isAddingSubject, setIsAddingSubject] = useState(false);
  const [newSubject, setNewSubject] = useState<Omit<Subject, 'id'>>({
    name: '',
    color: COLORS[0],
    hoursPerWeek: 0,
  });
  const [apiKey, setApiKey] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAddSubject = () => {
    if (!newSubject.name || newSubject.hoursPerWeek <= 0) return;

    const subject: Subject = {
      id: Date.now().toString(),
      ...newSubject,
    };

    setSubjects([...subjects, subject]);
    setIsAddingSubject(false);
    setNewSubject({
      name: '',
      color: COLORS[0],
      hoursPerWeek: 0,
    });
  };

  const removeSubject = (subjectId: string) => {
    setSubjects(subjects.filter(subject => subject.id !== subjectId));
  };

  const generateSchedule = async () => {
    if (!apiKey || subjects.length === 0) return;

    setIsGenerating(true);
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `Generate a weekly study schedule for the following subjects:
${subjects.map(s => `- ${s.name}: ${s.hoursPerWeek} hours per week`).join('\n')}

Rules:
- Schedule between 8 AM and 9 PM
- Include breaks
- Maximum 2 hours per session
- Return only the JSON array of schedule blocks in this format:
[{
  "day": "Monday",
  "startTime": "09:00",
  "endTime": "10:30",
  "subject": "Subject Name",
  "type": "study"
}]`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      try {
        const scheduleBlocks = JSON.parse(text);
        const blocks: TimeBlock[] = scheduleBlocks.map((block: any) => ({
          ...block,
          id: Date.now().toString() + Math.random(),
        }));
        onGenerateSchedule(blocks);
      } catch (e) {
        console.error('Failed to parse schedule:', e);
        alert('Failed to generate schedule. Please try again.');
      }
    } catch (error) {
      console.error('Error generating schedule:', error);
      alert('Failed to generate schedule. Please check your API key and try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Subjects</h2>
        <button
          onClick={() => setIsAddingSubject(true)}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4" />
          <span>Add Subject</span>
        </button>
      </div>

      <div className="mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-medium mb-4">AI Schedule Generation</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Google Gemini API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your API key"
              />
            </div>
            <button
              onClick={generateSchedule}
              disabled={!apiKey || subjects.length === 0 || isGenerating}
              className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg ${
                !apiKey || subjects.length === 0 || isGenerating
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              <Wand2 className="w-4 h-4" />
              <span>{isGenerating ? 'Generating...' : 'Generate Schedule'}</span>
            </button>
          </div>
        </div>
      </div>

      {isAddingSubject && (
        <div className="bg-white rounded-lg shadow mb-6 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">New Subject</h3>
            <button
              onClick={() => setIsAddingSubject(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject Name
              </label>
              <input
                type="text"
                value={newSubject.name}
                onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter subject name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hours per Week
              </label>
              <input
                type="number"
                min="1"
                value={newSubject.hoursPerWeek || ''}
                onChange={(e) => setNewSubject({ ...newSubject, hoursPerWeek: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter hours per week"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color Theme
              </label>
              <div className="grid grid-cols-6 gap-2">
                {COLORS.map((color, index) => (
                  <button
                    key={color}
                    onClick={() => setNewSubject({ ...newSubject, color })}
                    className={`w-8 h-8 rounded-full ${color.split(' ')[0]} border-2 ${
                      newSubject.color === color ? 'border-indigo-600' : 'border-transparent'
                    }`}
                  />
                ))}
              </div>
            </div>
            <button
              onClick={handleAddSubject}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Add Subject
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        {subjects.map(subject => (
          <div
            key={subject.id}
            className="p-4 border-b last:border-b-0 flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className={`w-4 h-4 rounded-full ${subject.color.split(' ')[0]}`} />
              <div>
                <h3 className="font-medium text-gray-800">{subject.name}</h3>
                <div className="text-sm text-gray-500">{subject.hoursPerWeek} hours per week</div>
              </div>
            </div>
            <button
              onClick={() => removeSubject(subject.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
        {subjects.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No subjects added yet. Add subjects to generate a study schedule.
          </div>
        )}
      </div>
    </div>
  );
}