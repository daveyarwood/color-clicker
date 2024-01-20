import { expect, test } from "vitest";
import { toHex, toColorHex, blockAmounts } from "../src/hex";

test("toHex", () => {
  expect(toHex(0)).toEqual("0");
  expect(toHex(10)).toEqual("a");
  expect(toHex(15)).toEqual("f");
  expect(toHex(16)).toEqual("10");
  expect(toHex(256)).toEqual("100");
  expect(toHex(4096)).toEqual("1000");
});

test("toColorHex", () => {
  expect(toColorHex(0)).toEqual("000");
  expect(toColorHex(10)).toEqual("00a");
  expect(toColorHex(15)).toEqual("00f");
  expect(toColorHex(16)).toEqual("010");
  expect(toColorHex(256)).toEqual("100");
  expect(toColorHex(4095)).toEqual("fff");
  expect(() => toColorHex(4096)).toThrowError("too many hex digits");
});

test("blockAmounts", () => {
  expect(blockAmounts(0x000)).toEqual([0x000]);
  expect(blockAmounts(0x001)).toEqual([0x001]);
  expect(blockAmounts(0x010)).toEqual([0x010]);
  expect(blockAmounts(0x0ff)).toEqual([0x0ff]);
  expect(blockAmounts(0x100)).toEqual([0x100]);
  expect(blockAmounts(0xabc)).toEqual([0xabc]);
  expect(blockAmounts(0xfff)).toEqual([0xfff]);
  expect(blockAmounts(0x1000)).toEqual([0x001, 0x000]);
  expect(blockAmounts(0x1abc)).toEqual([0x001, 0xabc]);
  expect(blockAmounts(0xabcdef)).toEqual([0xabc, 0xdef]);
  expect(blockAmounts(0x1abcdef)).toEqual([0x001, 0xabc, 0xdef]);
  expect(blockAmounts(0xffffffff)).toEqual([0x0ff, 0xfff, 0xfff]);
  expect(blockAmounts(0x123abcdef)).toEqual([0x123, 0xabc, 0xdef]);
  expect(blockAmounts(0xfffffffff)).toEqual([0xfff, 0xfff, 0xfff]);
  expect(blockAmounts(0x1000000000)).toEqual([0x001, 0x000, 0x000, 0x000]);
});
