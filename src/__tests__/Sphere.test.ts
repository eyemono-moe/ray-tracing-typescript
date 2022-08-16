import Ray from "../Ray"
import Sphere from "../Sphere"
import Vector from "../Vector"

describe("Sphere", () => {
  test("constructor", () => {
    const s = new Sphere(new Vector(0, 0, 0), 1)
    expect(s.center.e[0]).toBe(0)
    expect(s.center.e[1]).toBe(0)
    expect(s.center.e[2]).toBe(0)
    expect(s.radius).toBe(1)
  })

  describe("hit", () => {
    const s = new Sphere(new Vector(0, 0, 10), 1)

    test("hit from outside", () => {
      const r1 = new Ray(new Vector(0, 0, 0), new Vector(0, 0, 1))
      const h1 = s.hit(r1, 0, 100)
      expect(h1).not.toBeNull()
      if (h1 === null) return
      expect(h1.t).toBeCloseTo(9)
      expect(h1.point.e[0]).toBeCloseTo(0)
      expect(h1.point.e[1]).toBeCloseTo(0)
      expect(h1.point.e[2]).toBeCloseTo(9)
      expect(h1.frontFace).toBe(true)
    })

    test("hit from inside", () => {
      const r2 = new Ray(new Vector(0, 0, 10), new Vector(0, 0, 1))
      const h2 = s.hit(r2, 0, 100)
      expect(h2).not.toBeNull()
      if (h2 === null) return
      expect(h2.t).toBeCloseTo(1)
      expect(h2.point.e[0]).toBeCloseTo(0)
      expect(h2.point.e[1]).toBeCloseTo(0)
      expect(h2.point.e[2]).toBeCloseTo(11)
      expect(h2.frontFace).toBe(false)
    })

    test("miss", () => {
      const r3 = new Ray(new Vector(0, 0, 0), new Vector(0, 1, 0))
      const h3 = s.hit(r3, 0, 100)
      expect(h3).toBeNull()
    })

    test("miss at tMax", () => {
      const r4 = new Ray(new Vector(0, 0, 0), new Vector(0, 0, 1))
      const h4 = s.hit(r4, 0, 1)
      expect(h4).toBeNull()
    })

    test("miss at tMin", () => {
      const r5 = new Ray(new Vector(0, 0, 0), new Vector(0, 0, 1))
      const h5 = s.hit(r5, 50, 100)
      expect(h5).toBeNull()
    })
  })
})
