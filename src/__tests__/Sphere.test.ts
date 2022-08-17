import Ray from "../Ray"
import { Sphere } from "../Hittable/Sphere"
import Vector from "../Vector"
import BlankMaterial from "../Material/BlankMaterial"

describe("Sphere", () => {
  test("constructor", () => {
    const s = new Sphere(new Vector(0, 0, 0), 1, new BlankMaterial())
    expect(s.center.e[0]).toBe(0)
    expect(s.center.e[1]).toBe(0)
    expect(s.center.e[2]).toBe(0)
    expect(s.radius).toBe(1)
  })

  describe("hit", () => {
    const sp = new Sphere(new Vector(0, 0, 10), 1, new BlankMaterial())
    const sn = new Sphere(new Vector(0, 0, 10), -1, new BlankMaterial())

    test("hit from outside", () => {
      const r = new Ray(new Vector(0, 0, 0), new Vector(0, 0, 1))
      const h = sp.hit(r, 0, 100)
      expect(h).not.toBeNull()
      if (h === null) return
      expect(h.t).toBeCloseTo(9)
      expect(h.point.e[0]).toBeCloseTo(0)
      expect(h.point.e[1]).toBeCloseTo(0)
      expect(h.point.e[2]).toBeCloseTo(9)
      expect(h.frontFace).toBe(true)
    })

    test("hit from outside, negative radius", () => {
      const r = new Ray(new Vector(0, 0, 0), new Vector(0, 0, 1))
      const h = sn.hit(r, 0, 100)
      expect(h).not.toBeNull()
      if (h === null) return
      expect(h.frontFace).toBe(false)
    })

    test("hit from inside", () => {
      const r = new Ray(new Vector(0, 0, 10), new Vector(0, 0, 1))
      const h = sp.hit(r, 0, 100)
      expect(h).not.toBeNull()
      if (h === null) return
      expect(h.t).toBeCloseTo(1)
      expect(h.point.e[0]).toBeCloseTo(0)
      expect(h.point.e[1]).toBeCloseTo(0)
      expect(h.point.e[2]).toBeCloseTo(11)
      expect(h.frontFace).toBe(false)
    })

    test("hit from inside, negative radius", () => {
      const r = new Ray(new Vector(0, 0, 10), new Vector(0, 0, 1))
      const h = sn.hit(r, 0, 100)
      expect(h).not.toBeNull()
      if (h === null) return
      expect(h.frontFace).toBe(true)
    })

    test("hit at tangent", () => {
      const r = new Ray(new Vector(0, 1, 0), new Vector(0, 0, 1))
      const h = sp.hit(r, 0, 100)
      expect(h).toBeNull()
    })

    test("miss", () => {
      const r = new Ray(new Vector(0, 0, 0), new Vector(0, 1, 0))
      const h = sp.hit(r, 0, 100)
      expect(h).toBeNull()
    })

    test("miss at tMax", () => {
      const r = new Ray(new Vector(0, 0, 0), new Vector(0, 0, 1))
      const h = sp.hit(r, 0, 1)
      expect(h).toBeNull()
    })

    test("miss at tMin", () => {
      const r = new Ray(new Vector(0, 0, 0), new Vector(0, 0, 1))
      const h = sp.hit(r, 50, 100)
      expect(h).toBeNull()
    })
  })
})
