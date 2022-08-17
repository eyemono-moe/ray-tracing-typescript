import HittableList from "../Hittable/HittableList"
import Ray from "../Ray"
import Sphere from "../Hittable/Sphere"
import Vector from "../Vector"
import BlankMaterial from "../Material/BlankMaterial"

describe("HittableList", () => {
  const s = new Sphere(new Vector(0, 0, 0), 1, new BlankMaterial())
  describe("constructor", () => {
    test("initializes with empty array", () => {
      const hl = new HittableList()
      expect(hl.objects).toEqual([])
    })
    test("initializes with array", () => {
      const hl = new HittableList([s])
      expect(hl.objects).toEqual([s])
    })
  })

  test("add", () => {
    const hl = new HittableList()
    hl.add(s)
    expect(hl.objects).toEqual([s])
  })

  test("clear", () => {
    const hl = new HittableList([s])
    hl.clear()
    expect(hl.objects).toEqual([])
  })

  describe("hit", () => {
    const hl = new HittableList()
    const s1 = new Sphere(new Vector(0, 0, 20), 1, new BlankMaterial())
    const s2 = new Sphere(new Vector(0, 0, 10), 1, new BlankMaterial())
    hl.add(s1)
    hl.add(s2)
    const r = new Ray(new Vector(0, 0, 0), new Vector(0, 0, 1))
    const h1 = hl.hit(r, 0, 100)
    expect(h1).not.toBeNull()
    if (h1 === null) return
    expect(h1.point.e[0]).toBeCloseTo(0)
    expect(h1.point.e[1]).toBeCloseTo(0)
    expect(h1.point.e[2]).toBeCloseTo(9)
  })
})
