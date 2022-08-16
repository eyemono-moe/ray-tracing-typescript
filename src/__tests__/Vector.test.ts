import Vector from "../Vector"

describe("Vector", () => {
  test("constructor", () => {
    const v = new Vector(1, 2, 3)
    expect(v.e[0]).toBe(1)
    expect(v.e[1]).toBe(2)
    expect(v.e[2]).toBe(3)
  })

  test("add", () => {
    const v1 = new Vector(1, 2, 3)
    const v2 = new Vector(2, 3, 4)
    const v3 = Vector.add(v1, v2)
    expect(v3.e[0]).toBe(3)
    expect(v3.e[1]).toBe(5)
    expect(v3.e[2]).toBe(7)
  })

  test("sub", () => {
    const v1 = new Vector(1, 2, 3)
    const v2 = new Vector(2, 3, 4)
    const v3 = Vector.sub(v1, v2)
    expect(v3.e[0]).toBe(-1)
    expect(v3.e[1]).toBe(-1)
    expect(v3.e[2]).toBe(-1)
  })

  test("scale", () => {
    const v1 = new Vector(1, 2, 3)
    const v2 = Vector.scale(v1, 2)
    expect(v2.e[0]).toBe(2)
    expect(v2.e[1]).toBe(4)
    expect(v2.e[2]).toBe(6)
  })

  test("mul", () => {
    const v1 = new Vector(1, 2, 3)
    const v2 = new Vector(2, 3, 4)
    const v3 = Vector.mul(v1, v2)
    expect(v3.e[0]).toBe(2)
    expect(v3.e[1]).toBe(6)
    expect(v3.e[2]).toBe(12)
  })

  test("div", () => {
    const v1 = new Vector(2, 4, 6)
    const v2 = Vector.div(v1, 2)
    expect(v2.e[0]).toBe(1)
    expect(v2.e[1]).toBe(2)
    expect(v2.e[2]).toBe(3)
  })

  test("pow", () => {
    const v1 = new Vector(2, 4, 6)
    const v2 = Vector.pow(v1, 2)
    expect(v2.e[0]).toBe(4)
    expect(v2.e[1]).toBe(16)
    expect(v2.e[2]).toBe(36)
  })

  test("mag", () => {
    const v1 = new Vector(1, 2, 3)
    expect(Vector.mag(v1)).toBeCloseTo(Math.sqrt(14))
  })

  test("lengthSquared", () => {
    const v1 = new Vector(1, 2, 3)
    expect(Vector.lengthSquared(v1)).toBe(14)
  })

  test("dot", () => {
    const v1 = new Vector(1, 2, 3)
    const v2 = new Vector(2, 3, 4)
    expect(Vector.dot(v1, v2)).toBe(20)
  })

  test("cross", () => {
    const v1 = new Vector(1, 2, 3)
    const v2 = new Vector(2, 3, 4)
    const v3 = Vector.cross(v1, v2)
    expect(v3.e[0]).toBe(-1)
    expect(v3.e[1]).toBe(2)
    expect(v3.e[2]).toBe(-1)
  })

  test("normalize", () => {
    const v1 = new Vector(1, 2, 3)
    const v2 = Vector.normalize(v1)
    expect(v2.e[0]).toBeCloseTo(1 / Math.sqrt(14))
    expect(v2.e[1]).toBeCloseTo(2 / Math.sqrt(14))
    expect(v2.e[2]).toBeCloseTo(3 / Math.sqrt(14))
  })

  test("normalize zero vector", () => {
    const v1 = new Vector(0, 0, 0)
    const v2 = Vector.normalize(v1)
    expect(v2.e[0]).toBe(0)
    expect(v2.e[1]).toBe(0)
    expect(v2.e[2]).toBe(0)
  })

  test("randomUnitVector", () => {
    const v1 = Vector.randomUnitVector()
    expect(Vector.mag(v1)).toBeCloseTo(1)
  })

  test("reflect", () => {
    const v1 = new Vector(1, -1, 1)
    const v2 = new Vector(0, 1, 0)
    const v3 = Vector.reflect(v1, v2)
    expect(v3.e[0]).toBe(1)
    expect(v3.e[1]).toBe(1)
    expect(v3.e[2]).toBe(1)
  })
})
