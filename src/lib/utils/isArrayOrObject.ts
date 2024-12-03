import { PlainObject } from '@/model/types';
import { isArray } from '@/lib/utils/isArray';
import { isPlainObject } from '@/lib/utils/isPlainObject';

export function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}
