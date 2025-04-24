
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

interface UploadAreaProps {
  onUpload?: (files: File[]) => void;
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
}

const UploadArea: React.FC<UploadAreaProps> = ({
  onUpload,
  accept = '.tif,.tiff,.png,.jpg,.jpeg',
  maxSize = 50 * 1024 * 1024, // 50MB
  maxFiles = 10
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

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

  const processFiles = (fileList: FileList) => {
    const newFiles: File[] = [];
    const errors: string[] = [];
    
    // Convert FileList to array
    const fileArray = Array.from(fileList);
    
    // Check file count
    if (fileArray.length > maxFiles) {
      toast({
        title: "Too many files",
        description: `Maximum ${maxFiles} files allowed`,
        variant: "destructive"
      });
      return;
    }
    
    // Validate each file
    fileArray.forEach(file => {
      // Check file type
      const fileType = file.name.split('.').pop()?.toLowerCase();
      const acceptedTypes = accept.split(',').map(type => type.replace('.', '').toLowerCase());
      const isValidType = acceptedTypes.some(type => fileType === type);
      
      if (!isValidType) {
        errors.push(`${file.name}: Invalid file type`);
        return;
      }
      
      // Check file size
      if (file.size > maxSize) {
        errors.push(`${file.name}: Exceeds maximum size of ${Math.round(maxSize / (1024 * 1024))}MB`);
        return;
      }
      
      newFiles.push(file);
    });
    
    // Show errors if any
    if (errors.length > 0) {
      toast({
        title: "Upload issues",
        description: errors.join(', '),
        variant: "destructive"
      });
    }
    
    // Set valid files
    if (newFiles.length > 0) {
      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      
      // Notify parent component
      if (onUpload) {
        onUpload(updatedFiles);
      }
      
      toast({
        title: "Files added",
        description: `${newFiles.length} file(s) ready for analysis`
      });
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    if (onUpload) {
      onUpload(updatedFiles);
    }
  };

  const clearFiles = () => {
    setFiles([]);
    if (onUpload) {
      onUpload([]);
    }
  };

  return (
    <div className="w-full space-y-4">
      <Card 
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? "border-primary bg-primary/5" : "border-science-gray"
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
        <div className="border rounded-lg divide-y">
          <div className="p-3 bg-muted/50 flex justify-between items-center">
            <h3 className="font-medium text-sm">
              {files.length} file{files.length !== 1 ? 's' : ''} selected
            </h3>
            <Button variant="ghost" size="sm" onClick={clearFiles} className="text-red-500 hover:text-red-700 hover:bg-red-50">
              Clear All
            </Button>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {files.map((file, index) => (
              <div key={`${file.name}-${index}`} className="flex items-center justify-between p-3 hover:bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium truncate max-w-[200px]">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeFile(index)}
                  className="h-8 w-8 rounded-full hover:bg-red-50 hover:text-red-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </Button>
              </div>
            ))}
          </div>
          <div className="p-3 flex justify-end">
            <Button className="scientific-button-primary">
              Start Analysis
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadArea;
