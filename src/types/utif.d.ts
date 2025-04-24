
declare module 'utif' {
  export interface IFD {
    width: number;
    height: number;
    data?: ArrayBuffer;
  }

  export function decode(buffer: ArrayBuffer): IFD[];
  export function decodeImage(buffer: ArrayBuffer, ifd: IFD): void;
  export function toRGBA8(ifd: IFD): Uint8ClampedArray;
}

