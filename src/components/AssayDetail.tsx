
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface AssayDetailProps {
  id: string;
  title: string;
  description: string;
  category: string;
  cellType: string;
  imagingType: string;
  image: string;
  features: string[];
  inputs: { name: string; description: string }[];
  outputs: { name: string; description: string }[];
  performance: { metric: string; value: string }[];
}

const AssayDetail: React.FC<AssayDetailProps> = ({
  id,
  title,
  description,
  category,
  cellType,
  imagingType,
  image,
  features,
  inputs,
  outputs,
  performance
}) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left column - Image and basic info */}
        <div className="space-y-6">
          <div className="rounded-lg overflow-hidden border border-science-gray h-80">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="space-y-4 bg-white p-6 rounded-lg border border-science-gray">
            <h2 className="text-2xl font-bold text-science-blue">{title}</h2>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-science-light-purple/10 text-science-purple border-science-light-purple/30">
                {category}
              </Badge>
              <Badge variant="outline" className="bg-science-light-teal/10 text-science-teal border-science-light-teal/30">
                {cellType}
              </Badge>
              <Badge variant="secondary" className="bg-science-teal text-white">
                {imagingType}
              </Badge>
            </div>
            
            <p className="text-gray-700">{description}</p>
            
            <div>
              <h3 className="font-medium mb-2">Key Features</h3>
              <ul className="list-disc list-inside space-y-1 pl-2">
                {features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-700">{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right column - Detailed tabs */}
        <div className="space-y-6">
          <div className="rounded-lg bg-white p-6 border border-science-gray">
            <Tabs defaultValue="input" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="input">Input Data</TabsTrigger>
                <TabsTrigger value="output">Output Data</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
              </TabsList>
              
              <TabsContent value="input" className="space-y-4">
                <h3 className="font-medium text-lg">Required Input Data</h3>
                <div className="space-y-3">
                  {inputs.map((input, index) => (
                    <div key={index} className="p-3 border border-science-gray rounded-md">
                      <h4 className="font-medium text-sm">{input.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{input.description}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="output" className="space-y-4">
                <h3 className="font-medium text-lg">Analysis Outputs</h3>
                <div className="space-y-3">
                  {outputs.map((output, index) => (
                    <div key={index} className="p-3 border border-science-gray rounded-md">
                      <h4 className="font-medium text-sm">{output.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{output.description}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="performance" className="space-y-4">
                <h3 className="font-medium text-lg">Performance Metrics</h3>
                <div className="grid grid-cols-2 gap-3">
                  {performance.map((metric, index) => (
                    <div key={index} className="p-3 border border-science-gray rounded-md">
                      <p className="text-sm text-gray-500">{metric.metric}</p>
                      <p className="text-lg font-medium text-science-blue">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="rounded-lg bg-white p-6 border border-science-gray">
            <h3 className="font-medium text-lg mb-4">Run This Assay</h3>
            <p className="text-sm text-gray-700 mb-4">
              Upload your microscopy images to analyze with this assay. Results will be available for download in multiple formats.
            </p>
            <div className="flex flex-col gap-3">
              <Button className="w-full scientific-button-primary">
                Upload Images
              </Button>
              <Button variant="outline" className="w-full">
                Request Demo
              </Button>
            </div>
          </div>
          
          <div className="rounded-lg bg-muted/30 p-6 border border-science-gray">
            <div className="flex items-center gap-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-science-teal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <h3 className="font-medium">Documentation</h3>
            </div>
            <div className="text-sm space-y-2 text-gray-700">
              <p>Additional resources to help you get the most from this assay:</p>
              <ul className="list-disc list-inside pl-2">
                <li>Technical specifications</li>
                <li>Validation study</li>
                <li>Integration guide</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssayDetail;
