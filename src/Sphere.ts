import { HitRecord, IHittable } from "./Hittable"
import Ray from "./Ray"
import Vector from "./Vector"

export default class Sphere implements IHittable {
  constructor(public center: Vector, public radius: number) {}

  hit(ray: Ray, tMin: number, tMax: number): HitRecord | null {
    const oc = Vector.sub(ray.origin, this.center)
    const a = Vector.lengthSquared(ray.direction)
    const halfB = Vector.dot(oc, ray.direction)
    const c = Vector.lengthSquared(oc) - this.radius * this.radius
    const discriminant = halfB * halfB - a * c

    if (discriminant > 0) {
      const root = Math.sqrt(discriminant)
      const t1 = (-halfB - root) / a
      if (t1 < tMax && t1 > tMin) {
        const point = ray.at(t1)
        const outwardNormal = Vector.div(Vector.sub(point, this.center), this.radius)
        const frontFace = Vector.dot(ray.direction, outwardNormal) < 0
        const hitRecord: HitRecord = {
          point,
          normal: frontFace ? outwardNormal : Vector.scale(outwardNormal, -1),
          t: t1,
          frontFace
        }
        return hitRecord
      }
      const t2 = (-halfB + root) / a
      if (t2 < tMax && t2 > tMin) {
        const point = ray.at(t2)
        const outwardNormal = Vector.div(Vector.sub(point, this.center), this.radius)
        const frontFace = Vector.dot(ray.direction, outwardNormal) < 0
        const hitRecord: HitRecord = {
          point,
          normal: frontFace ? outwardNormal : Vector.scale(outwardNormal, -1),
          t: t2,
          frontFace
        }
        return hitRecord
      }
    }
    return null
  }
}
