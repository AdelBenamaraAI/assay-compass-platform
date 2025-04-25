
import UTIF from "utif";

interface IFD {
  width: number;
  height: number;
  data?: ArrayBufferLike;
}

/**
 * Loads a TIFF image by fetching, decoding, and drawing it to a canvas.
 * Automatically handles 16-bit grayscale TIFFs even if metadata is missing.
 */
export async function loadTiffImage(src: string): Promise<HTMLImageElement> {
  const buffer = await fetchArrayBuffer(src);
  const ifd = getFirstPageIFD(buffer);
  const rgba = extractRGBA(ifd);
  return renderToImage(rgba, ifd.width, ifd.height);
}

/** Fetch the TIFF as an ArrayBuffer, or throw on HTTP error */
async function fetchArrayBuffer(src: string): Promise<ArrayBuffer> {
  const res = await fetch(src);
  if (!res.ok) throw new Error(`Failed to fetch TIFF (${res.status})`);
  return res.arrayBuffer();
}

/** Decode the first IFD/page in the TIFF, or throw if empty */
function getFirstPageIFD(buffer: ArrayBuffer): IFD {
  const pages = UTIF.decode(buffer);
  if (pages.length === 0) throw new Error("No images found in TIFF");
  const ifd = pages[0];
  UTIF.decodeImage(buffer, ifd);
  return ifd;
}

/**
 * Turn the raw IFD data into an RGBA clamped array.
 *    - Try 16-bit → 8-bit grayscale normalization first
 *    - Otherwise fall back to UTIF.toRGBA8
 */
function extractRGBA(ifd: IFD): Uint8ClampedArray {
  const { data, width, height } = ifd;
  const pixels = width * height;

  if (data?.byteLength === pixels * 2) {
    try {
      // Using ArrayBufferLike which is compatible with both ArrayBuffer and SharedArrayBuffer
      const raw16 = new Uint16Array(data);
      return normalize16to8(raw16);
    } catch {
      console.warn("Grayscale normalization failed; using RGBA8 fallback");
    }
  }

  // UTIF.toRGBA8 returns Uint8Array → coerce to Uint8ClampedArray
  const fallback = UTIF.toRGBA8(ifd);
  return new Uint8ClampedArray(fallback);
}

/** Normalize a 16-bit grayscale buffer into 8-bit RGBA (min→0, max→255) */
function normalize16to8(raw: Uint16Array): Uint8ClampedArray {
  let min = Infinity,
    max = -Infinity;
  for (const v of raw) {
    if (v < min) min = v;
    if (v > max) max = v;
  }
  const range = max - min || 1;
  const out = new Uint8ClampedArray(raw.length * 4);

  for (let i = 0; i < raw.length; i++) {
    const gray = Math.round(((raw[i] - min) * 255) / range);
    const o = i * 4;
    out[o] = gray;
    out[o + 1] = gray;
    out[o + 2] = gray;
    out[o + 3] = 255;
  }

  return out;
}

/** Paint RGBA into a canvas and return as an HTMLImageElement */
function renderToImage(rgba: Uint8ClampedArray, width: number, height: number): Promise<HTMLImageElement> {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Cannot acquire 2D context");

  const imageData = ctx.createImageData(width, height);
  imageData.data.set(rgba);
  ctx.putImageData(imageData, 0, 0);

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = canvas.toDataURL();
    img.onload = () => (img.width && img.height ? resolve(img) : reject(new Error("Zero-dimension image")));
    img.onerror = () => reject(new Error("Failed to load TIFF as image"));
  });
}

