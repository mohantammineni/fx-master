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

export function ucFirst(str) {
  if (str == null || undefined) {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}