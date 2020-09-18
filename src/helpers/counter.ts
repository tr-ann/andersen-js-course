export function counter(start: number = 1) {
  let count = start;

  return () => count++;
}
