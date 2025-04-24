
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Microscope, ChartBar, BarChart2 } from 'lucide-react';
import Gauge from './Gauge';
import { Card } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  Tooltip,
  TooltipProps,
  Legend,
  CartesianGrid
} from 'recharts';
import { Separator } from '@/components/ui/separator';

interface CellAnalysisWidgetProps {
  percentage: number;
  imageUrl: string;
}

// Sample historical data - in a real app, this would come from your backend
const sampleData = [
  { name: 'Image 1', value: 85, min: 82, max: 88, avg: 85 },
  { name: 'Image 2', value: 78, min: 75, max: 81, avg: 78 },
  { name: 'Image 3', value: 92, min: 89, max: 95, avg: 92 },
  { name: 'Image 4', value: 88, min: 85, max: 91, avg: 88 },
  { name: 'Current', value: 0, min: 0, max: 0, avg: 0 },
];

const CellAnalysisWidget: React.FC<CellAnalysisWidgetProps> = ({ percentage, imageUrl }) => {
  const chartData = React.useMemo(() => {
    const newData = [...sampleData];
    newData[newData.length - 1] = {
      name: 'Current',
      value: percentage,
      min: Math.max(percentage - 3, 0),
      max: Math.min(percentage + 3, 100),
      avg: percentage
    };
    return newData;
  }, [percentage]);

  const aggregatedStats = React.useMemo(() => {
    const values = chartData.map(d => d.value);
    return {
      min: Math.min(...values),
      max: Math.max(...values),
      avg: values.reduce((acc, val) => acc + val, 0) / values.length
    };
  }, [chartData]);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Microscope className="h-5 w-5 text-orange-500" />
              <h3 className="text-lg font-medium">Cell Analysis Results</h3>
            </div>
            <BarChart2 className="h-5 w-5 text-orange-500" />
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
                <div className="absolute bottom-0 left-0 right-0 bg-gradient 
                  to-t from-black/50 to-transparent p-4">
                  <p className="text-sm text-white font-medium">Cell Sample Analysis</p>
                </div>
              </div>
            </div>
            
            {/* Gauge Section */}
            <div className="flex flex-col justify-center items-center bg-muted/30 rounded-lg p-4">
              <h4 className="text-sm font-medium mb-4">Current Pluripotency Score</h4>
              <Gauge value={percentage} size="lg" />
            </div>
          </div>

          <Separator className="my-6" />
          
          {/* Aggregated Stats */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-muted/20 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Min Score</p>
              <p className="text-2xl font-semibold text-orange-500">{aggregatedStats.min}%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Average Score</p>
              <p className="text-2xl font-semibold text-orange-500">{aggregatedStats.avg.toFixed(1)}%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Max Score</p>
              <p className="text-2xl font-semibold text-orange-500">{aggregatedStats.max}%</p>
            </div>
          </div>

          {/* Historical Data Chart */}
          <div>
            <h4 className="text-sm font-medium mb-4">Analysis Trend & Distribution</h4>
            <div className="h-[300px]">
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
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload?.length) {
                        return null;
                      }
                      return (
                        <ChartTooltipContent
                          active={active}
                          payload={payload}
                          label={label}
                          className="bg-background/80 backdrop-blur-sm"
                        />
                      );
                    }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="value" 
                    name="Score" 
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="min" 
                    name="Min Range" 
                    fill="#fbd38d"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="max" 
                    name="Max Range" 
                    fill="#f97316"
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
