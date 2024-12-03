import { PlainObject } from '@/model/types';

export function shallowEqual(a: PlainObject, b: PlainObject): boolean {
  if (Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }

  for (const key of Object.keys(a)) {
    if (a[key] !== b[key]) {
      return false;
    }
  }

  return true;
}
