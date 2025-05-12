import { expect, test } from "vitest";
import { blockAmounts } from "../src/hsl.tsx";

test("blockAmounts", () => {
  expect(blockAmounts(0)).toEqual([0]);
  expect(blockAmounts(1)).toEqual([1]);
  expect(blockAmounts(250)).toEqual([250]);
  expect(blockAmounts(359)).toEqual([359]);
  expect(blockAmounts(360)).toEqual([360, 0]);
  expect(blockAmounts(560)).toEqual([360, 200]);
  expect(blockAmounts(720)).toEqual([360, 360, 0]);
});
