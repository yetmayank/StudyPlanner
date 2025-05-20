import React from 'react';
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
  };
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <div className="rounded-full bg-gray-100 p-2">
          {icon}
        </div>
      </div>
      <div className="mt-2">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        
        {change && (
          <div className="flex items-center mt-2 text-sm">
            {change.type === 'increase' && (
              <div className="flex items-center text-green-600">
                <ArrowUpRight size={16} />
                <span className="ml-1">{change.value}% increase</span>
              </div>
            )}
            {change.type === 'decrease' && (
              <div className="flex items-center text-red-600">
                <ArrowDownRight size={16} />
                <span className="ml-1">{change.value}% decrease</span>
              </div>
            )}
            {change.type === 'neutral' && (
              <div className="flex items-center text-gray-600">
                <Minus size={16} />
                <span className="ml-1">No change</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;