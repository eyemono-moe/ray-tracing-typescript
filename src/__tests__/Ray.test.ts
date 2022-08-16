import Ray from "../Ray"
import Vector from "../Vector"

describe("Ray", () => {
  test("constructor", () => {
    const r = new Ray(new Vector(1, 2, 3), new Vector(4, 5, 6))
    expect(r.origin.e[0]).toBe(1)
    expect(r.origin.e[1]).toBe(2)
    expect(r.origin.e[2]).toBe(3)
    expect(r.direction.e[0]).toBe(4)
    expect(r.direction.e[1]).toBe(5)
    expect(r.direction.e[2]).toBe(6)
  })

  test("at", () => {
    const r = new Ray(new Vector(1, 2, 3), new Vector(4, 5, 6))
    const p = r.at(10)
    expect(p.e[0]).toBe(1 + 40)
    expect(p.e[1]).toBe(2 + 50)
    expect(p.e[2]).toBe(3 + 60)
  })
})
