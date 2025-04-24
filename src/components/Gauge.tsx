
import React from 'react';
import { CircleGauge } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GaugeProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
}

const Gauge: React.FC<GaugeProps> = ({ value, size = 'md' }) => {
  const circumference = 2 * Math.PI * 40; // r = 40
  const offset = circumference - (value / 100) * circumference;
  
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-40 h-40'
  };

  return (
    <div className={cn('relative flex items-center justify-center', sizeClasses[size])}>
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          className="text-muted stroke-current"
          strokeWidth="8"
          fill="transparent"
          r="40"
          cx="50%"
          cy="50%"
        />
        <circle
          className="text-orange-500 stroke-current transition-all duration-500 ease-in-out"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          fill="transparent"
          r="40"
          cx="50%"
          cy="50%"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <CircleGauge className="w-6 h-6 text-orange-500 mb-1" />
        <span className="text-2xl font-bold text-orange-500">{value}%</span>
        <span className="text-xs text-muted-foreground">Pluripotency</span>
      </div>
    </div>
  );
};

export default Gauge;
