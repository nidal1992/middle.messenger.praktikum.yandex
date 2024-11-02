export function parseUserData(userData: Record<string, string>) {
  const result: Record<string, string> = {};

  Object.entries(userData).forEach(([key, value]) => {
    const parsedKey = key.replaceAll('_', ' ');
    result[parsedKey] = value;
  });

  return result;
}
