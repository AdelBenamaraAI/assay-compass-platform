
import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

interface FilterCategory {
  name: string;
  options: string[];
}

interface FilterSidebarProps {
  onFilter: (filters: Record<string, string[]>) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onFilter }) => {
  const filterCategories: FilterCategory[] = [
    {
      name: 'Application Area',
      options: ['Regenerative Medicine', 'Immuno-Oncology', 'Gene Therapy', 'Cell Manufacturing', 'Drug Discovery']
    },
    {
      name: 'Cell Type',
      options: ['Stem Cells', 'T Cells', 'NK Cells', 'Fibroblasts', 'Organoids', 'Spheroids']
    },
    {
      name: 'Imaging Modality',
      options: ['Brightfield', 'Fluorescence', 'Confocal', 'Phase Contrast', 'Light Sheet']
    },
    {
      name: 'Market Segment',
      options: ['Clinical', 'Pre-clinical', 'Research', 'Manufacturing']
    }
  ];

  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const handleFilterChange = (category: string, option: string, checked: boolean) => {
    setSelectedFilters(prev => {
      const currentCategoryFilters = prev[category] || [];
      const updatedCategoryFilters = checked
        ? [...currentCategoryFilters, option]
        : currentCategoryFilters.filter(item => item !== option);
      
      return {
        ...prev,
        [category]: updatedCategoryFilters
      };
    });
  };

  const applyFilters = () => {
    onFilter(selectedFilters);
  };

  const clearFilters = () => {
    setSelectedFilters({});
    onFilter({});
  };

  return (
    <div className="w-full md:w-64 lg:w-72 p-4">
      <h2 className="text-lg font-medium mb-4">Filter Assays</h2>
      
      <div className="space-y-6">
        {filterCategories.map(category => (
          <div key={category.name} className="space-y-2">
            <h3 className="font-medium text-sm text-science-blue">{category.name}</h3>
            <div className="space-y-1.5">
              {category.options.map(option => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`${category.name}-${option}`} 
                    checked={selectedFilters[category.name]?.includes(option) || false}
                    onCheckedChange={(checked) => {
                      handleFilterChange(category.name, option, checked === true);
                    }}
                  />
                  <Label 
                    htmlFor={`${category.name}-${option}`}
                    className="text-sm cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
            <Separator className="mt-3" />
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-2">
        <Button 
          onClick={applyFilters}
          className="w-full scientific-button-primary"
        >
          Apply Filters
        </Button>
        <Button 
          onClick={clearFilters}
          variant="outline"
          className="w-full border-science-gray text-gray-600"
        >
          Clear All
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;
