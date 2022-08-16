import Color from "../Color"
import { HitRecord } from "../Hittable/Hittable"
import Ray from "../Ray"
import Vector from "../Vector"
import { Material, Scatter } from "./Material"

export default class Metal extends Material {
  constructor(public albedo: Color, public fuzz: number = 0) {
    super()
  }
  scatter(ray: Ray, hitRecord: HitRecord): Scatter {
    const reflected = Vector.reflect(Vector.normalize(ray.direction), hitRecord.normal)
    const scatteredRay = new Ray(
      hitRecord.point,
      Vector.add(reflected, Vector.scale(Vector.randomUnitVector(), this.fuzz))
    )
    const attenuation = this.albedo
    return {
      scattered: Vector.dot(scatteredRay.direction, hitRecord.normal) > 0,
      scatteredRay: scatteredRay,
      attenuation: attenuation
    }
  }
}
