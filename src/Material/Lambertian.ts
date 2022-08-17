import Color from "../Color"
import HitRecord from "../Hittable/HitRecord"
import Ray from "../Ray"
import Vector from "../Vector"
import Scatter from "./Scatter"
import BlankMaterial from "./BlankMaterial"

export default class Lambertian extends BlankMaterial {
  constructor(public albedo: Color) {
    super()
  }
  scatter(_ray: Ray, hitRecord: HitRecord): Scatter {
    const direction = Vector.add(hitRecord.normal, Vector.randomUnitVector())
    const scatteredRay = new Ray(hitRecord.point, direction)
    return {
      scattered: true,
      scatteredRay: scatteredRay,
      attenuation: this.albedo
    }
  }
}
