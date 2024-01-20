export const toHex = (n: number): string => n.toString(16);

export const toColorHex = (n: number): string => {
  if (n > 0xfff) {
    throw new Error(`${n} (0x${toHex(n)}) is too many hex digits`);
  }

  return toHex(n).padStart(3, "0");
};

export const blockAmounts = (n: number) => {
  if (n == 0) {
    return [0];
  }

  const result = [];

  let remainder = n;

  while (remainder > 0) {
    const blockAmount = remainder % 0x1000;
    result.push(blockAmount);
    remainder -= blockAmount;

    if (remainder >= 0x1000) {
      remainder /= 0x1000;
    }
  }

  return result.slice().reverse();
};
