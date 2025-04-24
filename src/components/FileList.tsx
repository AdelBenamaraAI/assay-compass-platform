
import React from 'react';
import { Button } from '@/components/ui/button';
import CellAnalysisWidget from './CellAnalysisWidget';

interface FileListProps {
  files: File[];
  analyzedImages: Array<{ url: string; percentage: number }>;
  onRemove: (index: number) => void;
  onClearAll: () => void;
}

const FileList: React.FC<FileListProps> = ({ 
  files, 
  analyzedImages, 
  onRemove, 
  onClearAll 
}) => {
  if (files.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="border rounded-lg divide-y">
        <div className="p-3 bg-muted/50 flex justify-between items-center">
          <h3 className="font-medium text-sm">
            {files.length} file{files.length !== 1 ? 's' : ''} selected
          </h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearAll}
            className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
          >
            Clear All
          </Button>
        </div>
        <div className="grid gap-6 p-6">
          {analyzedImages.map((image, index) => (
            <div key={`${files[index].name}-${index}`} className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-sm">
                    <p className="font-medium truncate max-w-[200px]">{files[index].name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(files[index].size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => onRemove(index)}
                  className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </Button>
              </div>
              <CellAnalysisWidget 
                imageUrl={image.url} 
                percentage={image.percentage}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileList;
