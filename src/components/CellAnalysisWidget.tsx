
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Microscope } from 'lucide-react';

interface CellAnalysisWidgetProps {
  percentage: number;
  imageUrl: string;
}

const CellAnalysisWidget: React.FC<CellAnalysisWidgetProps> = ({ percentage, imageUrl }) => {
  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Microscope className="h-5 w-5 text-accent" />
          <h3 className="text-lg font-medium">Cell Analysis Results</h3>
        </div>
        
        <div className="aspect-video relative rounded-lg overflow-hidden border border-border">
          <img 
            src={imageUrl} 
            alt="Analyzed cell image" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Pluripotent Cells</span>
            <span className="font-medium">{percentage}%</span>
          </div>
          <Progress value={percentage} className="h-2" />
        </div>
      </div>
    </div>
  );
};

export default CellAnalysisWidget;
