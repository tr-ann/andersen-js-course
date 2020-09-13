function counter() {
  let count = 1;

  return () => count++;
}

export let count = counter();
