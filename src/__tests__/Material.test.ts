import HitRecord from "../Hittable/HitRecord"
import BlankMaterial from "../Material/BlankMaterial"
import Ray from "../Ray"
import Vector from "../Vector"

describe("Material", () => {
  test("constructor", () => {
    const m = new BlankMaterial()
    expect(m.scatter).toBeDefined()
  })

  test("scatter", () => {
    const m = new BlankMaterial()
    const ray = new Ray(new Vector(0, 0, 0), new Vector(0, 0, 1))
    const hitRecord: HitRecord = {
      point: new Vector(0, 0, 0),
      normal: new Vector(0, 0, 1),
      material: m,
      t: 1,
      frontFace: true
    }
    expect(m.scatter(ray, hitRecord)).toEqual({
      scattered: false
    })
  })
})
