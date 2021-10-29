import {polyfillGlobal} from 'react-native/Libraries/Utilities/PolyfillFunctions';
import {TextEncoder, TextDecoder} from 'text-encoding';

polyfillGlobal('TextEncoder', () => TextEncoder);
polyfillGlobal('TextDecoder', () => TextDecoder);
