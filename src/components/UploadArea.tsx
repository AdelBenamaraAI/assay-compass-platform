
import React from 'react';
import { useFileUpload } from '../hooks/useFileUpload';
import DropZone from './DropZone';
import FileList from './FileList';

interface UploadAreaProps {
  onUpload?: (files: File[]) => void;
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
}

const UploadArea: React.FC<UploadAreaProps> = ({
  onUpload,
  accept,
  maxSize,
  maxFiles
}) => {
  const { 
    files, 
    analyzedImages, 
    processFiles, 
    removeFile, 
    clearFiles 
  } = useFileUpload({ 
    accept, 
    maxSize, 
    maxFiles, 
    onUpload 
  });

  return (
    <div className="w-full space-y-4">
      <DropZone 
        onFilesDrop={processFiles}
        accept={accept}
      />
      <FileList
        files={files}
        analyzedImages={analyzedImages}
        onRemove={removeFile}
        onClearAll={clearFiles}
      />
    </div>
  );
};

export default UploadArea;
