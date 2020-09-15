// eslint-disable-next-line import/prefer-default-export
export function foo(x, cb) {
  if (x <= 10) {
    console.log('x <= 10');
  } else {
    console.log('x > 10');
    cb();
  }
}

export function createCb(str) {
  return () => console.log(str);
}
