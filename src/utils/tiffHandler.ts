
import UTIF from 'utif';

export const convertTiffToImageData = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      try {
        // Read the TIFF file
        const buffer = reader.result as ArrayBuffer;
        const ifds = UTIF.decode(buffer);
        
        // UTIF.decode returns an array of IFDs (pages)
        if (ifds.length === 0) {
          reject(new Error('No images found in TIFF file'));
          return;
        }
        
        // Get the first page
        const firstPage = ifds[0];
        
        // Decode RGBA data
        UTIF.decodeImage(buffer, firstPage);
        const rgba = UTIF.toRGBA8(firstPage);
        
        // Create canvas to convert to viewable format
        const canvas = document.createElement('canvas');
        canvas.width = firstPage.width;
        canvas.height = firstPage.height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        // Create ImageData and put it on canvas
        const imageData = new ImageData(
          new Uint8ClampedArray(rgba.buffer),
          firstPage.width,
          firstPage.height
        );
        ctx.putImageData(imageData, 0, 0);
        
        // Convert to data URL
        resolve(canvas.toDataURL());
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsArrayBuffer(file);
  });
};
