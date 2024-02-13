const sorting = require("../../app");

describe("Books names test suit", () => {
  it("Books names should be sorted in ascending order", () => {
    const input = [
      "Гарри Поттер",
      "Властелин Колец",
      "Волшебник изумрудного города",
    ];
    const expected = [
      "Властелин Колец",
      "Волшебник изумрудного города",
      "Гарри Поттер",
    ];
    const output = sorting.sortByName(input);
    expect(output).toEqual(expected);
  });

  it("Should work correctly with one item", () => {
    const input = ["Гарри Поттер"];
    const output = sorting.sortByName(input);
    expect(output).toEqual(["Гарри Поттер"]);
  });

  it("should handle repetitive content", () => {
    const input = [
      "Гарри Поттер",
      "Властелин колец",
      "Властелин колец",
    ];
    const expected = [
      "Властелин колец",
      "Властелин колец",
      "Гарри Поттер"
    ];
    const output = sorting.sortByName(input);
    expect(output).toEqual(expected);
  });

  it("Without params throws exception", () => {
    expect(() => sorting.sortByName()).toThrow(TypeError);
  });
});