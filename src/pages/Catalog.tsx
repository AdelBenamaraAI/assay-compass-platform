
import React, { useState } from 'react';
import AssayCard, { AssayCardProps } from '@/components/AssayCard';
import FilterSidebar from '@/components/FilterSidebar';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Sample assay data
const sampleAssays: AssayCardProps[] = [
  {
    id: 'pluripotency',
    title: 'Pluripotency Quantification',
    description: 'Automatically detects and segments individual cells in fluorescence images, then calculates the percentage of nuclei positive for key pluripotency markers.',
    category: 'Regenerative Medicine',
    cellType: 'Stem Cells',
    imagingType: 'Fluorescence',
    thumbnail: 'https://www.clinisciences.com/en/upload/thumbs/311012_125025_PEEL_7THAMr-e3dba5.jpg',
  },
  {
    id: 'carcounting',
    title: 'CAR-T Cell Enumeration',
    description: 'Quantifies total CAR-T cells and assesses viability from brightfield and fluorescence microscopy images.',
    category: 'Immuno-Oncology',
    cellType: 'T Cells',
    imagingType: 'Brightfield',
    thumbnail: 'https://www.stemcell.com/media/images/pages/20th-anniversary/immunology-features/CAR-T-Cell.jpg',
  },
  {
    id: 'organoid',
    title: 'Organoid Morphology Analysis',
    description: 'Characterizes 3D organoid structures to quantify size, shape, and complexity metrics across multiple z-stacks.',
    category: 'Drug Discovery',
    cellType: 'Organoids',
    imagingType: 'Confocal',
    thumbnail: 'https://www.zeiss.com/content/dam/rms/reference-master/applications/life-sciences/image-analysis-examples-for-organoid-growth-analysis/63935be603a95239f3c35f40_organoid_3_3d_image_landscape-web.jpg/_jcr_content/renditions/original.image_file.1440.810.90,0,1690,900.file/63935be603a95239f3c35f40_organoid_3_3d_image_landscape-web.jpg',
  },
  {
    id: 'viability',
    title: 'Cell Viability Assessment',
    description: 'Determines viability percentages of mixed cell populations using multiple fluorescent markers.',
    category: 'Cell Manufacturing',
    cellType: 'Fibroblasts',
    imagingType: 'Fluorescence',
    thumbnail: 'https://blog.crownbio.com/hubfs/high-content-screening.png',
  },
  {
    id: 'spheroid',
    title: 'Spheroid Growth Tracking',
    description: 'Monitors the growth and morphology of tumor spheroids over time for drug screening applications.',
    category: 'Drug Discovery',
    cellType: 'Spheroids',
    imagingType: 'Phase Contrast',
    thumbnail: 'https://d2jx2rerrg6sh3.cloudfront.net/image-handler/picture/2020/4/art-2-2.jpg',
  },
  {
    id: 'nkcell',
    title: 'NK Cell Cytotoxicity Analyzer',
    description: 'Quantifies NK cell-mediated cytotoxicity against target cells using time-lapse imaging data.',
    category: 'Immuno-Oncology',
    cellType: 'NK Cells',
    imagingType: 'Fluorescence',
    thumbnail: 'https://www.researchgate.net/profile/Hongkai-Zhang-5/publication/283078668/figure/fig3/AS:931578955976705@1599117139112/Scanning-electron-microscopy-analysis-of-NK-cells-interacting-with-a-target-cell-A-A.jpg',
  },
];

const Catalog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAssays, setFilteredAssays] = useState(sampleAssays);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [isMobileFilterVisible, setIsMobileFilterVisible] = useState(false);

  const handleFilter = (filters: Record<string, string[]>) => {
    setActiveFilters(filters);
    
    // Apply filters
    let results = sampleAssays;
    
    // Filter by search query first
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        assay => 
          assay.title.toLowerCase().includes(query) || 
          assay.description.toLowerCase().includes(query) ||
          assay.category.toLowerCase().includes(query) ||
          assay.cellType.toLowerCase().includes(query)
      );
    }
    
    // Apply categorical filters
    Object.entries(filters).forEach(([category, selectedOptions]) => {
      if (selectedOptions.length > 0) {
        results = results.filter(assay => {
          if (category === 'Application Area') {
            return selectedOptions.includes(assay.category);
          }
          if (category === 'Cell Type') {
            return selectedOptions.includes(assay.cellType);
          }
          if (category === 'Imaging Modality') {
            return selectedOptions.includes(assay.imagingType);
          }
          return true;
        });
      }
    });
    
    setFilteredAssays(results);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handleFilter(activeFilters);
  };

  const toggleMobileFilter = () => {
    setIsMobileFilterVisible(!isMobileFilterVisible);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-science-blue">Assay Catalog</h1>
            <p className="text-gray-600 mt-1">
              Browse and filter our collection of validated cell analysis assays
            </p>
          </div>
          
          <div className="w-full md:w-auto mt-4 md:mt-0">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input 
                type="search" 
                placeholder="Search assays..." 
                className="w-full md:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit">Search</Button>
            </form>
          </div>
        </div>
        
        <div className="block md:hidden mb-4">
          <Button 
            onClick={toggleMobileFilter}
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            {isMobileFilterVisible ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className={`${isMobileFilterVisible ? 'block' : 'hidden'} md:block md:w-72 flex-shrink-0`}>
            <div className="bg-white border border-science-gray rounded-lg sticky top-24">
              <FilterSidebar onFilter={handleFilter} />
            </div>
          </div>
          
          <div className="flex-grow">
            {filteredAssays.length > 0 ? (
              <>
                <p className="text-sm text-gray-500 mb-4">
                  Showing {filteredAssays.length} assays
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAssays.map(assay => (
                    <AssayCard key={assay.id} {...assay} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12 bg-muted/30 rounded-lg border border-science-gray">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">No assays found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveFilters({});
                    setFilteredAssays(sampleAssays);
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
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

export default Catalog;
