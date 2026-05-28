// src/core/config/polyfill.ts
import 'react-native-url-polyfill/auto';

if (typeof global !== 'undefined' && typeof global.DOMException === 'undefined') {
  global.DOMException = class DOMException extends Error {
    constructor(message?: string, name?: string) {
      super(message);
      this.name = name || 'DOMException';
    }
  } as any;
}