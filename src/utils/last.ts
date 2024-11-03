export function last<T>(list: T[]): T | undefined {
  return Array.isArray(list) ? list.at(-1) : undefined;
}
