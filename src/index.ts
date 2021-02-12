import Md5 from 'react-native-quick-md5';
// @ts-ignore
import NativeFileReaderModule from 'react-native/Libraries/Blob/NativeFileReaderModule.js';

type CallbackFunction = (base64Hash: string) => any;

export function binaryMd5(data: string | Blob, callback: CallbackFunction) {
  if (typeof data === 'string') {
    const md5 = Md5.calc(data, 'utf8', 'base64');
    setImmediate(() => callback(md5));
  } else {
    // @ts-ignore
    NativeFileReaderModule.readAsDataURL(data.data).then((url: string) => {
      const base64Data = url.split(',')[1];
      const md5 = Md5.calc(base64Data, 'base64', 'base64');
      callback(md5);
    });
  }
}
export function stringMd5(data: string) {
  return Md5.calc(data, 'utf8', 'hex');
}

export default {
  binaryMd5,
  stringMd5,
};
