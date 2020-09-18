function counter() {
  let count = 4;

  return () => count++;
}

export let count = counter();
