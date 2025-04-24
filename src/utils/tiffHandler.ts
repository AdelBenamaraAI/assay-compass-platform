
import UTIF from "utif";

/** Converts a File object containing TIFF data to a data URL */
export const convertTiffToImageData = async (file: File): Promise<string> => {
  const buffer = await readFileAsArrayBuffer(file);
  const ifd = getFirstIFD(buffer);
  const { width, height } = ifd;
  const rgba = extractRGBA(ifd, buffer, width * height);
  const image = await createImageFromRGBA(rgba, width, height);
  return image.src;
};

/** Reads a File as ArrayBuffer */
function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
}

/** Decodes the first IFD in the TIFF buffer or throws if none found */
function getFirstIFD(buffer: ArrayBuffer): UTIF.IFD {
  const ifds = UTIF.decode(buffer);
  if (ifds.length === 0) throw new Error("No image data in TIFF.");
  const ifd = ifds[0];
  UTIF.decodeImage(buffer, ifd);
  return ifd;
}

/**
 * Returns an RGBA Uint8ClampedArray for this IFD.
 * Tries 16-bit grayscale normalization first, then falls back to UTIF.toRGBA8.
 */
function extractRGBA(ifd: UTIF.IFD, buffer: ArrayBuffer, pixelCount: number): Uint8ClampedArray {
  const expectedBytes = pixelCount * 2;
  const raw = ifd.data;

  if (raw?.byteLength === expectedBytes) {
    try {
      return normalize16BitGrayscale(new Uint16Array(raw.buffer, raw.byteOffset, pixelCount));
    } catch {
      console.warn("16-bit normalization failed; falling back to RGBA8");
    }
  }

  return UTIF.toRGBA8(ifd);
}

/** Maps 16-bit grayscale → 8-bit RGBA (min→0, max→255) */
function normalize16BitGrayscale(pixels16: Uint16Array): Uint8ClampedArray {
  let min = Infinity, max = -Infinity;
  for (const v of pixels16) {
    if (v < min) min = v;
    if (v > max) max = v;
  }
  const range = max - min || 1;
  const rgba = new Uint8ClampedArray(pixels16.length * 4);

  for (let i = 0; i < pixels16.length; i++) {
    const gray8 = Math.round(((pixels16[i] - min) * 255) / range);
    const o = i * 4;
    rgba[o] = rgba[o+1] = rgba[o+2] = gray8;
    rgba[o+3] = 255;
  }

  return rgba;
}

/** Renders RGBA data into a Canvas, then returns it as an HTMLImageElement */
function createImageFromRGBA(rgba: Uint8ClampedArray, width: number, height: number): Promise<HTMLImageElement> {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Failed to get 2D canvas context.");

  const imgData = new ImageData(rgba, width, height);
  ctx.putImageData(imgData, 0, 0);

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = canvas.toDataURL();
    img.onload = () => (img.width && img.height) ? resolve(img) : reject(new Error("Invalid image dimensions"));
    img.onerror = () => reject(new Error("Error loading TIFF image"));
  });
}

