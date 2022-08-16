import Color from "../Color"
import { HitRecord } from "../Hittable/Hittable"
import Ray from "../Ray"
import Vector from "../Vector"
import { Material, Scatter } from "./Material"

export default class Lambertian extends Material {
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
