export function parseLocation() {
  return location.hash.slice(1).toLowerCase() || '/';
}

export function getParam() {
  return parseLocation().split('/')[1];
}