export function last<T>(list: T[]): T | undefined {
  return Array.isArray(list) ? list[0] : undefined;
}
