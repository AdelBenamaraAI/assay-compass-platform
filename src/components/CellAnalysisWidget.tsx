
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
import { Separator } from '@/components/ui/separator';

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
          
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Image Section */}
            <div className="lg:col-span-2">
              <div className="aspect-video relative rounded-lg overflow-hidden border border-border bg-black/5">
                <img 
                  src={imageUrl} 
                  alt="Analyzed cell image" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                  <p className="text-sm text-white font-medium">Cell Sample Analysis</p>
                </div>
              </div>
            </div>
            
            {/* Gauge Section */}
            <div className="flex flex-col justify-center items-center bg-muted/30 rounded-lg p-4">
              <h4 className="text-sm font-medium mb-4">Pluripotency Score</h4>
              <Gauge value={percentage} size="lg" />
            </div>
          </div>

          <Separator className="my-6" />
          
          {/* Historical Data Chart */}
          <div>
            <h4 className="text-sm font-medium mb-4">Historical Analysis Trend</h4>
            <div className="h-[200px]">
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
                  <Bar 
                    dataKey="value" 
                    name="Pluripotency %" 
                    fill="currentColor" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CellAnalysisWidget;
