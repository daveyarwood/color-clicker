export const blockAmounts = (n: number) => {
  const result = [];

  let remaining = n;

  while (remaining >= 360) {
    remaining -= 360;
    result.push(360);
  }

  result.push(remaining);

  return result;
};
