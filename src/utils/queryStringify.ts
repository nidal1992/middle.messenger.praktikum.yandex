export function queryStringify(data: Record<string, unknown>): string {
  return `?${Object.entries(data).reduce(
    (res, [key, value], i, arr) =>
      `${res}${encodeURIComponent(key)}=${encodeURIComponent(String(value))}${i !== arr.length - 1 ? '&' : ''}`,
    '',
  )}`;
}
