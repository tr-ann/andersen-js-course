export function isEqual(arr1: Array<number>, arr2: Array<number>): boolean {
  if (arr1.length != arr2.length) return false;

  return arr1.every(el => {
    return arr2.indexOf(el) == -1 ? false : true;
  });
}
