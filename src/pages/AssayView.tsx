
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import AssayDetail from '@/components/AssayDetail';
import UploadArea from '@/components/UploadArea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample assay data mapped by ID
const assayData: Record<string, any> = {
  'pluripotency': {
    id: 'pluripotency',
    title: 'Pluripotency Quantification',
    description: 'Automatically detects and segments individual cells in fluorescence images, then calculates the percentage of nuclei positive for key pluripotency markers such as Oct4 and Nanog. Ideal for stem cell quality control and differentiation experiments.',
    category: 'Regenerative Medicine',
    cellType: 'Stem Cells',
    imagingType: 'Fluorescence',
    image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=800&h=600',
    features: [
      'Automated nuclei segmentation based on DAPI or Hoechst staining',
      'Multi-channel marker quantification for Oct4, Nanog, Sox2, and other markers',
      'Intensity thresholding with adaptive algorithms for optimal sensitivity',
      'Cell population statistics including marker co-expression patterns',
      'Rapid processing of multi-well plate images for high-throughput applications'
    ],
    inputs: [
      { name: 'Nuclei Channel (DAPI/Hoechst)', description: '8 or 16-bit grayscale TIFF for nuclear staining' },
      { name: 'Marker Channel 1', description: '8 or 16-bit grayscale TIFF for first pluripotency marker (e.g. Oct4)' },
      { name: 'Marker Channel 2 (Optional)', description: '8 or 16-bit grayscale TIFF for second pluripotency marker (e.g. Nanog)' }
    ],
    outputs: [
      { name: 'Cell Count Data', description: 'Total cell count and marker-positive percentages in CSV format' },
      { name: 'Segmentation Overlay', description: 'Visual confirmation of cell identification with color-coded markers' },
      { name: 'Expression Histogram', description: 'Distribution of marker expression levels across cell population' },
      { name: 'Raw Measurements', description: 'Per-cell measurements including coordinates, size, and marker intensities' }
    ],
    performance: [
      { metric: 'Processing Time', value: '~2 sec per image' },
      { metric: 'Accuracy', value: '95.8%' },
      { metric: 'Precision', value: '0.94' },
      { metric: 'Recall', value: '0.96' }
    ]
  },
  'carcounting': {
    id: 'carcounting',
    title: 'CAR-T Cell Enumeration',
    description: 'Quantifies total CAR-T cells and assesses viability from brightfield and fluorescence microscopy images. Essential for immunotherapy product quality control and release testing.',
    category: 'Immuno-Oncology',
    cellType: 'T Cells',
    imagingType: 'Brightfield',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&h=600',
    features: [
      'Automated T cell identification in brightfield images',
      'Live/dead discrimination using viability dyes',
      'CAR expression quantification with intensity thresholding',
      'Cellular morphology analysis for quality assessment',
      'Batch processing for multiple samples with comparative analysis'
    ],
    inputs: [
      { name: 'Brightfield Channel', description: '8 or 16-bit grayscale/RGB TIFF for cell identification' },
      { name: 'Viability Channel', description: '8 or 16-bit grayscale TIFF for viability staining' },
      { name: 'CAR Expression Channel', description: '8 or 16-bit grayscale TIFF for CAR expression detection' }
    ],
    outputs: [
      { name: 'Cell Enumeration Data', description: 'Total, viable, and CAR+ cell counts in CSV format' },
      { name: 'Viability Report', description: 'Percentage viability with statistical confidence intervals' },
      { name: 'CAR Expression Profile', description: 'Distribution of CAR expression levels across the cell population' },
      { name: 'Quality Metrics', description: 'Aggregated quality indicators for product release decision support' }
    ],
    performance: [
      { metric: 'Processing Time', value: '~3 sec per image' },
      { metric: 'Accuracy', value: '97.2%' },
      { metric: 'Precision', value: '0.96' },
      { metric: 'Recall', value: '0.98' }
    ]
  }
};

const AssayView: React.FC = () => {
  const { id } = useParams<{id: string}>();
  const [activeTab, setActiveTab] = useState('details');
  
  // Get the assay data based on the ID parameter
  const assay = id ? assayData[id] : null;
  
  if (!assay) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center flex-grow">
          <h1 className="text-2xl font-bold mb-4">Assay Not Found</h1>
          <p className="text-gray-600 mb-8">The assay you're looking for doesn't exist or may have been removed.</p>
          <Button asChild>
            <Link to="/catalog">Return to Assay Catalog</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Link to="/catalog" className="text-science-teal hover:text-science-blue">
            Assay Catalog
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-700">{assay.title}</span>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList className="grid w-[400px] grid-cols-2">
              <TabsTrigger value="details">Assay Details</TabsTrigger>
              <TabsTrigger value="upload">Upload & Analyze</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="details" className="animate-fade-in">
            <AssayDetail {...assay} />
          </TabsContent>
          
          <TabsContent value="upload" className="animate-fade-in">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg border border-science-gray p-6 mb-8">
                <h2 className="text-2xl font-bold text-science-blue mb-4">Upload Images for Analysis</h2>
                <p className="text-gray-700 mb-6">
                  Upload your microscopy images to analyze with the {assay.title} assay. 
                  Results will be available for download in multiple formats.
                </p>
                
                <UploadArea />
              </div>
              
              <div className="bg-muted/30 rounded-lg border border-science-gray p-6">
                <h3 className="text-lg font-medium mb-4">Image Requirements</h3>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-md border border-science-gray">
                      <h4 className="font-medium text-sm mb-2">Supported Formats</h4>
                      <p className="text-sm text-gray-600">TIF, TIFF, PNG, JPG, JPEG</p>
                    </div>
                    <div className="bg-white p-4 rounded-md border border-science-gray">
                      <h4 className="font-medium text-sm mb-2">Maximum File Size</h4>
                      <p className="text-sm text-gray-600">50MB per file</p>
                    </div>
                    <div className="bg-white p-4 rounded-md border border-science-gray">
                      <h4 className="font-medium text-sm mb-2">Recommended Resolution</h4>
                      <p className="text-sm text-gray-600">1024x1024 pixels or higher</p>
                    </div>
                    <div className="bg-white p-4 rounded-md border border-science-gray">
                      <h4 className="font-medium text-sm mb-2">Channel Requirements</h4>
                      <p className="text-sm text-gray-600">See assay specifications for required channels</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-md border border-science-gray">
                    <h4 className="font-medium text-sm mb-2">Important Notes</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      <li>Ensure images are properly calibrated and channels are well separated</li>
                      <li>For multi-channel analysis, upload separate files for each channel</li>
                      <li>Use consistent naming conventions for related images</li>
                      <li>Results are typically ready within 5 minutes of upload completion</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Simple Footer */}
      <footer className="mt-auto bg-gray-900 text-gray-300 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© 2025 AssayCompass. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AssayView;
