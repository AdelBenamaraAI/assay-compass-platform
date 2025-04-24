
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { convertTiffToImageData } from '../utils/tiffHandler';

interface UseFileUploadOptions {
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
  onUpload?: (files: File[]) => void;
}

interface AnalyzedImage {
  url: string;
  percentage: number;
}

export const useFileUpload = ({ 
  accept = '.tif,.tiff,.png,.jpg,.jpeg',
  maxSize = 50 * 1024 * 1024,
  maxFiles = 10,
  onUpload 
}: UseFileUploadOptions = {}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [analyzedImages, setAnalyzedImages] = useState<AnalyzedImage[]>([]);

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
          let imageUrl: string;
          
          if (file.name.toLowerCase().endsWith('.tif') || file.name.toLowerCase().endsWith('.tiff')) {
            try {
              imageUrl = await convertTiffToImageData(file);
            } catch (error) {
              console.error('Error processing TIFF file:', error);
              toast({
                title: "TIFF Processing Error",
                description: `Could not process ${file.name}. Please try a different file.`,
                variant: "destructive"
              });
              return null;
            }
          } else {
            imageUrl = URL.createObjectURL(file);
          }
          
          return {
            url: imageUrl,
            percentage: Math.floor(Math.random() * (95 - 75 + 1) + 75)
          };
        })
      );
      
      const validImages = newAnalyzedImages.filter((image): image is AnalyzedImage => 
        image !== null
      );
      
      setAnalyzedImages(prev => [...prev, ...validImages]);
      
      if (onUpload) {
        onUpload(updatedFiles);
      }
      
      toast({
        title: "Files added",
        description: `${validImages.length} file(s) ready for analysis`
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

  return {
    files,
    analyzedImages,
    processFiles,
    removeFile,
    clearFiles
  };
};
