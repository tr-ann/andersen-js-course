export function isEqual(arr1: Array<number>, arr2: Array<number>): boolean {
  return arr1.every(el => {
    return arr2.indexOf(el) == -1 ? false : true;
  });
}
