import { itemSchemaZod } from "../../src/models/Items";
import { describe, it, expect } from "vitest";

const item = {
  type: "lost",
  category: "Stationery",
  itemName: "Pen",
  colour: "red",
  brand: "Bic",
  location: "D2010",
  dateFound: new Date(),
  notes: "I lost my red bic pen in the office",
  status: "open",
};

describe("itemSchemaZod", () => {
  it("accepts a valid item", () => {
    expect(() => itemSchemaZod.parse(item)).not.toThrow();
  });

  describe("type", () => {
    it.each([
      ["missing", undefined],
      ["empty", ""],
      ["unparsable", "wrong type"],
    ])("should fail for %s type", (_label, type) => {
      expect(() => itemSchemaZod.parse({ ...item, type })).toThrow();
    });
    it("should pass for a valid type", () => {
      expect(() =>
        itemSchemaZod.parse({ ...item, type: "lost" }),
      ).not.toThrow();
    });
  });

  describe("dateFound", () => {
    it.each([
      ["missing", undefined],
      ["empty", ""],
      ["unparsable", "wrong date"],
    ])("should fail for %s date", (_label, dateFound) => {
      expect(() => itemSchemaZod.parse({ ...item, dateFound })).toThrow();
    });
    it("should pass for a valid date", () => {
      expect(() =>
        itemSchemaZod.parse({ ...item, dateFound: new Date() }),
      ).not.toThrow();
    });
  });

  describe("category", () => {
    it.each([
      ["missing", undefined],
      ["empty", ""],
    ])("should fail for %s category", (_label, category) => {
      expect(() => itemSchemaZod.parse({ ...item, category })).toThrow();
    });
    it("should pass for a valid category", () => {
      expect(() =>
        itemSchemaZod.parse({ ...item, category: "Stationery" }),
      ).not.toThrow();
    });
  });

  describe("colour", () => {
    it.each([
      ["missing", undefined],
      ["empty", ""],
      ["unparsable", 999],
    ])("should fail for %s colour", (_label, colour) => {
      expect(() => itemSchemaZod.parse({ ...item, colour })).toThrow();
    });
    it("should pass for a valid colour", () => {
      expect(() =>
        itemSchemaZod.parse({ ...item, colour: "red" }),
      ).not.toThrow();
    });
  });

  describe("location", () => {
    it.each([
      ["empty", ""],
      ["unparsable", 999],
    ])("should fail for %s location", (_label, location) => {
      expect(() => itemSchemaZod.parse({ ...item, location })).toThrow();
    });
    it("should pass for a valid location", () => {
      expect(() =>
        itemSchemaZod.parse({ ...item, location: "D2010" }),
      ).not.toThrow();
    });
  });

  describe("status", () => {
    it.each([
      ["missing", undefined],
      ["empty", ""],
      ["unparsable", "wrong status"],
    ])("should fail for %s status", (_label, status) => {
      expect(() => itemSchemaZod.parse({ ...item, status })).toThrow();
    });
    it("should pass for a valid status", () => {
      expect(() =>
        itemSchemaZod.parse({ ...item, status: "open" }),
      ).not.toThrow();
    });
  });
});
