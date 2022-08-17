import BlankMaterial from "./BlankMaterial"
import Color from "../Color"
import HitRecord from "../Hittable/HitRecord"
import Ray from "../Ray"
import Vector from "../Vector"
import Scatter from "./Scatter"

export default class Dielectric extends BlankMaterial {
  constructor(public refractiveIndex: number) {
    super()
  }
  scatter(ray: Ray, hitRecord: HitRecord): Scatter {
    const attenuation = new Color(1, 1, 1)
    const eta = hitRecord.frontFace ? 1 / this.refractiveIndex : this.refractiveIndex
    const unitDirection = Vector.normalize(ray.direction)
    const cosTheta = Math.min(-Vector.dot(unitDirection, hitRecord.normal), 1)
    const sinTheta = Math.sqrt(1 - cosTheta * cosTheta)

    // Total internal reflection
    if (eta * sinTheta > 1 || Math.random() < schlicksApproximation(cosTheta, eta)) {
      const reflected = Vector.reflect(unitDirection, hitRecord.normal)
      const scatteredRay = new Ray(hitRecord.point, reflected)
      return {
        scattered: true,
        scatteredRay,
        attenuation
      }
    }

    // Refraction
    const refractedDirection = Vector.refract(unitDirection, hitRecord.normal, eta)
    const scatteredRay = new Ray(hitRecord.point, refractedDirection)
    return {
      scattered: true,
      scatteredRay,
      attenuation
    }
  }
}

const schlicksApproximation = (cosTheta: number, refractiveIndex: number) => {
  let r0 = (1 - refractiveIndex) / (1 + refractiveIndex)
  r0 *= r0
  return r0 + (1 - r0) * Math.pow(1 - cosTheta, 5)
}
