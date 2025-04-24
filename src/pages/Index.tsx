
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <section className="bg-gradient-to-b from-science-blue to-science-purple py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Advanced Image Analysis for <span className="text-science-bright">Cell Therapy</span>
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              A centralized marketplace for biologists to discover, run, and apply cutting-edge image analysis pipelines
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button asChild size="lg" className="bg-white text-science-blue hover:bg-white/90">
                <Link to="/catalog">Browse Assays</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="#">Learn More</Link>
              </Button>
            </div>
            <div className="pt-8">
              <img 
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&w=1200&h=400&fit=crop" 
                alt="Cell therapy visualization" 
                className="rounded-lg shadow-xl w-full object-cover h-64 md:h-80"
              />
            </div>
          </div>
        </div>
      </section>
      
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
                <h3 className="text-xl font-medium mb-2">Assay Catalog</h3>
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
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-medium mb-4">AssayCompass</h3>
              <p className="text-sm">
                The leading marketplace for cell therapy image analysis pipelines.
              </p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Assays</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="#" className="hover:text-white">Regenerative Medicine</Link></li>
                <li><Link to="#" className="hover:text-white">Immuno-Oncology</Link></li>
                <li><Link to="#" className="hover:text-white">Cell Manufacturing</Link></li>
                <li><Link to="#" className="hover:text-white">Gene Therapy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="#" className="hover:text-white">Documentation</Link></li>
                <li><Link to="#" className="hover:text-white">API Reference</Link></li>
                <li><Link to="#" className="hover:text-white">Case Studies</Link></li>
                <li><Link to="#" className="hover:text-white">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="#" className="hover:text-white">About Us</Link></li>
                <li><Link to="#" className="hover:text-white">Careers</Link></li>
                <li><Link to="#" className="hover:text-white">Contact</Link></li>
                <li><Link to="#" className="hover:text-white">Blog</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© 2025 AssayCompass. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
