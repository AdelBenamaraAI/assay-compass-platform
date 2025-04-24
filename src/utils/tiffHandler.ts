
import * as TIFF from 'tiff';

export const convertTiffToImageData = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    
    // Use the correct TIFF API - decode() is a function on the module itself
    const tiffData = TIFF.decode(new Uint8Array(arrayBuffer));
    
    // Get the first image from the TIFF (TIFFs can contain multiple images)
    const firstImage = Array.isArray(tiffData) ? tiffData[0] : tiffData;
    
    // Get image dimensions and data
    const { width, height, data } = firstImage;
    
    // Create a canvas to draw the TIFF data
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Could not get canvas context');
    }

    // Create ImageData from the TIFF data
    const imageData = new ImageData(
      new Uint8ClampedArray(data),
      width,
      height
    );
    
    ctx.putImageData(imageData, 0, 0);
    
    // Convert to base64 PNG for display
    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Error processing TIFF file:', error);
    throw error;
  }
};
