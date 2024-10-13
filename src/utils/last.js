export function last(list) {
  return Array.isArray(list) ? list.at(-1) : undefined;
}
