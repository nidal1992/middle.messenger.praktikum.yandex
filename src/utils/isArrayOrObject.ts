import { isArray } from '@/utils/isArray';
import { isPlainObject } from '@/utils/isPlainObject';
import { PlainObject } from '@/model/interfaces';

export function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}
