import { PlainObject } from '@/model/types';
import { isArrayOrObject } from '@/lib/utils/isArrayOrObject';
import { isPlainObject } from '@/lib/utils/isPlainObject';

function getKey(key: string, parentKey?: string) {
  return parentKey ? `${parentKey}[${key}]` : key;
}

function getParams(data: PlainObject | [], parentKey?: string) {
  const result: [string, string][] = [];

  for (const [key, value] of Object.entries(data)) {
    if (isArrayOrObject(value)) {
      result.push(...getParams(value, getKey(key, parentKey)));
    } else {
      result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
    }
  }

  return result;
}

export function queryString(data: PlainObject): string {
  if (!isPlainObject(data)) {
    throw new Error('input must be an object');
  }

  return getParams(data)
    .map((arr) => arr.join('='))
    .join('&');
}
