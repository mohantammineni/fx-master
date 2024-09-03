export function getInitialsName(name) {
  if (name == null || undefined) {
    return '';
  }
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
}