import toRoundedPercent from "../toRoundedPercent";

describe("To percent converter", () => {
  test("Converts numbers to they percent equivalents", () => {
    expect(toRoundedPercent(0)).toBe(0);
    expect(toRoundedPercent(1)).toBe(100);
    expect(toRoundedPercent(0.3)).toBe(30);
    expect(toRoundedPercent(2)).toBe(200);
    expect(toRoundedPercent(0.555)).toBe(56);
    expect(toRoundedPercent(0.554)).toBe(55);
  });
});
