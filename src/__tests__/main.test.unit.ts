import { HELLO_WORLD } from "@/main";

describe("example suite", () => {
  it("failing", () => {
    expect(HELLO_WORLD).not.toEqual("Hello World");
  });
});
