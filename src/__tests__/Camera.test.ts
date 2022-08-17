import PerspectiveCamera from "../Camera/PerspectiveCamera"
import Vector from "../Vector"

describe("Camera", () => {
  test("constructor", () => {
    const c = new PerspectiveCamera(new Vector(0, 0, 0), 2, 1)
    expect(c.origin.e[0]).toBe(0)
    expect(c.origin.e[1]).toBe(0)
    expect(c.origin.e[2]).toBe(0)
    expect(c.lowerLeftCorner.e[0]).toBe(-1)
    expect(c.lowerLeftCorner.e[1]).toBe(-1)
    expect(c.lowerLeftCorner.e[2]).toBe(-1)
    expect(c.horizontal.e[0]).toBe(2)
    expect(c.horizontal.e[1]).toBe(0)
    expect(c.horizontal.e[2]).toBe(0)
    expect(c.vertical.e[0]).toBe(0)
    expect(c.vertical.e[1]).toBe(2)
    expect(c.vertical.e[2]).toBe(0)
  })

  test("getRay", () => {
    const c = new PerspectiveCamera(new Vector(0, 0, 0), 2, 1)
    const r1 = c.getRay(0, 0)
    expect(r1.origin.e[0]).toBe(0)
    expect(r1.origin.e[1]).toBe(0)
    expect(r1.origin.e[2]).toBe(0)
    expect(r1.direction.e[0]).toBe(-1)
    expect(r1.direction.e[1]).toBe(-1)
    expect(r1.direction.e[2]).toBe(-1)

    const r2 = c.getRay(0.5, 0.5)
    expect(r2.origin.e[0]).toBe(0)
    expect(r2.origin.e[1]).toBe(0)
    expect(r2.origin.e[2]).toBe(0)
    expect(r2.direction.e[0]).toBe(0)
    expect(r2.direction.e[1]).toBe(0)
    expect(r2.direction.e[2]).toBe(-1)

    const r3 = c.getRay(1, 1)
    expect(r3.origin.e[0]).toBe(0)
    expect(r3.origin.e[1]).toBe(0)
    expect(r3.origin.e[2]).toBe(0)
    expect(r3.direction.e[0]).toBe(1)
    expect(r3.direction.e[1]).toBe(1)
    expect(r3.direction.e[2]).toBe(-1)
  })
})
