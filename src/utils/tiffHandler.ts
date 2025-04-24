
import * as TIFF from 'tiff';

export const convertTiffToImageData = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const tiff = new TIFF.TiffDecoder(new Uint8Array(arrayBuffer));
    const image = tiff.decode();
    
    // Create a canvas to draw the TIFF data
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Could not get canvas context');
    }

    // Create ImageData from the TIFF data
    const imageData = new ImageData(
      new Uint8ClampedArray(image.data),
      image.width,
      image.height
    );
    
    ctx.putImageData(imageData, 0, 0);
    
    // Convert to base64 PNG for display
    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Error processing TIFF file:', error);
    throw error;
  }
};

