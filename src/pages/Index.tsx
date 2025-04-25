
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">

      
      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-science-blue mb-4">Streamline Your Cell Analysis Workflow</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Access validated image analysis pipelines optimized for cell therapy applications
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="scientific-card">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="9" y1="3" x2="9" y2="21"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Assay Marketplace</h3>
                <p className="text-gray-600">
                  Explore a comprehensive library of validated image-analysis pipelines with detailed documentation.
                </p>
              </CardContent>
            </Card>
            
            {/* Feature 2 */}
            <Card className="scientific-card">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Advanced Filtering</h3>
                <p className="text-gray-600">
                  Quickly find the perfect assay by filtering across market segment, cell type, and imaging modality.
                </p>
              </CardContent>
            </Card>
            
            {/* Feature 3 */}
            <Card className="scientific-card">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">One-Click Analysis</h3>
                <p className="text-gray-600">
                  Upload your microscopy images and instantly receive quantitative readouts with visualizations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Featured Assay Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-science-blue mb-4">Featured Assay</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most popular cell analysis pipeline
            </p>
          </div>
          
          <div className="bg-white rounded-xl overflow-hidden shadow-md max-w-4xl mx-auto border border-science-gray">
            <div className="grid md:grid-cols-2">
              <div className="p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-science-blue mb-4">Pluripotency Quantification</h3>
                <p className="text-gray-700 mb-6">
                  Automatically detect and segment individual cells in fluorescence images, then calculate the percentage of nuclei positive for key pluripotency markers (Oct4, Nanog).
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-science-teal mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span className="text-gray-700">High-throughput cell segmentation</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-science-teal mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span className="text-gray-700">Multi-channel marker quantification</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-science-teal mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span className="text-gray-700">Detailed cell population statistics</span>
                  </div>
                </div>
                <Button asChild className="scientific-button-primary mt-8 self-start">
                  <Link to="/assay/pluripotency">Explore Assay</Link>
                </Button>
              </div>
              <div className="bg-gray-100 flex items-center justify-center p-8">
                <img 
                  src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=600&h=400" 
                  alt="Pluripotency quantification assay" 
                  className="rounded-lg shadow-md max-h-full max-w-full object-contain" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-science-purple to-science-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to accelerate your cell analysis?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Start analyzing your microscopy data with our validated assays today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-science-blue hover:bg-white/90">
              <Link to="/catalog">Browse Assay Catalog</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="#">Request Demo</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      
    </div>
  );
};

export default Index;
