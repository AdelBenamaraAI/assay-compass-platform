import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import CellAnalysisWidget from './CellAnalysisWidget';
import { convertTiffToImageData } from '@/utils/tiffHandler';

interface UploadAreaProps {
  onUpload?: (files: File[]) => void;
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
}

const UploadArea: React.FC<UploadAreaProps> = ({
  onUpload,
  accept = '.tif,.tiff,.png,.jpg,.jpeg',
  maxSize = 50 * 1024 * 1024,
  maxFiles = 10
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [analyzedImages, setAnalyzedImages] = useState<Array<{url: string, percentage: number}>>([]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  const processFiles = async (fileList: FileList) => {
    const newFiles: File[] = [];
    const errors: string[] = [];
    
    const fileArray = Array.from(fileList);
    
    if (fileArray.length > maxFiles) {
      toast({
        title: "Too many files",
        description: `Maximum ${maxFiles} files allowed`,
        variant: "destructive"
      });
      return;
    }
    
    for (const file of fileArray) {
      const fileType = file.name.split('.').pop()?.toLowerCase();
      const acceptedTypes = accept.split(',').map(type => type.replace('.', '').toLowerCase());
      const isValidType = acceptedTypes.some(type => fileType === type);
      
      if (!isValidType) {
        errors.push(`${file.name}: Invalid file type`);
        continue;
      }
      
      if (file.size > maxSize) {
        errors.push(`${file.name}: Exceeds maximum size of ${Math.round(maxSize / (1024 * 1024))}MB`);
        continue;
      }
      
      newFiles.push(file);
    }
    
    if (errors.length > 0) {
      toast({
        title: "Upload issues",
        description: errors.join(', '),
        variant: "destructive"
      });
    }
    
    if (newFiles.length > 0) {
      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      
      const newAnalyzedImages = await Promise.all(
        newFiles.map(async (file) => {
          let url;
          if (file.name.toLowerCase().endsWith('.tif') || file.name.toLowerCase().endsWith('.tiff')) {
            try {
              url = await convertTiffToImageData(file);
            } catch (error) {
              console.error('Error converting TIFF:', error);
              toast({
                title: "TIFF conversion error",
                description: `Failed to convert ${file.name}`,
                variant: "destructive"
              });
              return null;
            }
          } else {
            url = URL.createObjectURL(file);
          }
          
          return {
            url,
            percentage: Math.floor(Math.random() * (95 - 75 + 1) + 75)
          };
        })
      );
      
      const validAnalyzedImages = newAnalyzedImages.filter(
        (image): image is { url: string; percentage: number } => image !== null
      );
      
      setAnalyzedImages(prev => [...prev, ...validAnalyzedImages]);
      
      if (onUpload) {
        onUpload(updatedFiles);
      }
      
      toast({
        title: "Files added",
        description: `${validAnalyzedImages.length} file(s) ready for analysis`
      });
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedAnalyzedImages = analyzedImages.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setAnalyzedImages(updatedAnalyzedImages);
    if (onUpload) {
      onUpload(updatedFiles);
    }
  };

  const clearFiles = () => {
    setFiles([]);
    setAnalyzedImages([]);
    if (onUpload) {
      onUpload([]);
    }
  };

  return (
    <div className="w-full space-y-4">
      <Card 
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? "border-primary bg-primary/5" : "border-border"
        } transition-colors duration-200`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-medium">Drag and drop your microscopy images</h3>
            <p className="text-sm text-gray-500 mt-1">
              Support for TIF, TIFF, PNG, JPG formats (max 50MB per file)
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="file"
              id="file-upload"
              multiple
              accept={accept}
              onChange={handleFileChange}
              className="hidden"
            />
            <Button asChild variant="outline" className="scientific-button">
              <label htmlFor="file-upload" className="cursor-pointer">
                Browse Files
              </label>
            </Button>
          </div>
        </div>
      </Card>

      {files.length > 0 && (
        <div className="space-y-6">
          <div className="border rounded-lg divide-y">
            <div className="p-3 bg-muted/50 flex justify-between items-center">
              <h3 className="font-medium text-sm">
                {files.length} file{files.length !== 1 ? 's' : ''} selected
              </h3>
              <Button variant="ghost" size="sm" onClick={clearFiles} className="text-destructive hover:text-destructive/90 hover:bg-destructive/10">
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
                      onClick={() => removeFile(index)}
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
      )}
    </div>
  );
};

export default UploadArea;
