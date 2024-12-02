import { PlainObject } from '@/model/interfaces';

export function isPlainObject(value: unknown): value is PlainObject {
  return (
    typeof value === 'object' &&
    value !== null &&
    'constructor' in value &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
}
