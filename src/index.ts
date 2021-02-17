import {
  binaryMd5 as nativeBinaryMd5,
  stringMd5 as nativeStringMd5,
  // @ts-ignore
} from 'react-native-quick-md5';
// @ts-ignore
import NativeFileReaderModule from 'react-native/Libraries/Blob/NativeFileReaderModule.js';

const g = global as any;

type CallbackFunction = (base64Hash: string) => any;

export function binaryMd5(data: string | Blob, callback: CallbackFunction) {
  if (typeof data === 'string') {
    const md5Hex = nativeBinaryMd5(data);
    const md5 = g.Buffer.from(md5Hex, 'hex').toString('base64');
    setImmediate(() => callback(md5));
  } else {
    // @ts-ignore
    NativeFileReaderModule.readAsDataURL(data.data).then((url: string) => {
      const base64Data = url.split(',')[1];
      const binStr = g.atob(base64Data);
      const md5Hex = nativeBinaryMd5(binStr);
      const md5 = g.Buffer.from(md5Hex, 'hex').toString('base64');
      callback(md5);
    });
  }
}
export function stringMd5(data: string) {
  return nativeStringMd5(data);
}

export default {
  binaryMd5,
  stringMd5,
};
