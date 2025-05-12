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

export const colorBlock = (n: number) => (
  <span
    key={crypto.randomUUID()}
    style={{ color: n == 360 ? "hsl(0 0% 0%)" : `hsl(${n} 50% 50%)` }}
  >
    ■
  </span>
);

export const renderColorBlocks = (total: number) =>
  blockAmounts(total).map((n) => colorBlock(n));