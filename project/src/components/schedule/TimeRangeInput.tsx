import React from 'react';

interface TimeRangeInputProps {
  range: {
    start: string;
    end: string;
  };
  onChange: (range: { start: string; end: string }) => void;
}

const TimeRangeInput: React.FC<TimeRangeInputProps> = ({ range, onChange }) => {
  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...range,
      start: e.target.value
    });
  };
  
  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...range,
      end: e.target.value
    });
  };
  
  return (
    <div className="flex items-center space-x-2">
      <input
        type="time"
        value={range.start}
        onChange={handleStartTimeChange}
        className="block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      />
      <span className="text-gray-500">to</span>
      <input
        type="time"
        value={range.end}
        onChange={handleEndTimeChange}
        className="block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      />
    </div>
  );
};

export default TimeRangeInput;