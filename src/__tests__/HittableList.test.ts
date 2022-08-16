import HittableList from "../HittableList"
import Ray from "../Ray"
import Sphere from "../Sphere"
import Vector from "../Vector"

describe("HittableList", () => {
  describe("constructor", () => {
    test("initializes with empty array", () => {
      const hl = new HittableList()
      expect(hl.objects).toEqual([])
    })
    test("initializes with array", () => {
      const hl = new HittableList([new Sphere(new Vector(0, 0, 0), 1)])
      expect(hl.objects).toEqual([new Sphere(new Vector(0, 0, 0), 1)])
    })
  })

  test("add", () => {
    const hl = new HittableList()
    hl.add(new Sphere(new Vector(0, 0, 0), 1))
    expect(hl.objects).toEqual([new Sphere(new Vector(0, 0, 0), 1)])
  })

  test("clear", () => {
    const hl = new HittableList([new Sphere(new Vector(0, 0, 0), 1)])
    hl.clear()
    expect(hl.objects).toEqual([])
  })

  describe("hit", () => {
    const hl = new HittableList()
    const s1 = new Sphere(new Vector(0, 0, 20), 1)
    const s2 = new Sphere(new Vector(0, 0, 10), 1)
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
