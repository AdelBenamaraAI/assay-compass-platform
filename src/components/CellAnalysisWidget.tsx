
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Microscope, ChartBar } from 'lucide-react';
import Gauge from './Gauge';
import { Card } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';

interface CellAnalysisWidgetProps {
  percentage: number;
  imageUrl: string;
}

// Sample historical data - in a real app, this would come from your backend
const sampleData = [
  { name: 'Image 1', value: 85 },
  { name: 'Image 2', value: 78 },
  { name: 'Image 3', value: 92 },
  { name: 'Image 4', value: 88 },
  { name: 'Current', value: 0 }, // This will be updated dynamically
];

const CellAnalysisWidget: React.FC<CellAnalysisWidgetProps> = ({ percentage, imageUrl }) => {
  const chartData = React.useMemo(() => {
    const newData = [...sampleData];
    newData[newData.length - 1].value = percentage;
    return newData;
  }, [percentage]);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Microscope className="h-5 w-5 text-orange-500" />
              <h3 className="text-lg font-medium">Cell Analysis Results</h3>
            </div>
            <ChartBar className="h-5 w-5 text-orange-500" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="aspect-video relative rounded-lg overflow-hidden border border-border">
              <img 
                src={imageUrl} 
                alt="Analyzed cell image" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex items-center justify-center">
              <Gauge value={percentage} />
            </div>
          </div>
          
          <div className="h-[200px] mt-6">
            <ChartContainer
              className="h-full"
              config={{
                bar: {
                  theme: {
                    light: "#f97316",
                    dark: "#f97316"
                  }
                }
              }}
            >
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip 
                  content={(props) => {
                    if (!props.active || !props.payload?.length) {
                      return null;
                    }
                    return (
                      <ChartTooltipContent
                        {...props}
                        className="bg-background/80 backdrop-blur-sm"
                      />
                    );
                  }}
                />
                <Bar dataKey="value" name="Pluripotency %" fill="currentColor" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CellAnalysisWidget;
