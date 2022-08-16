import Ray from "./Ray"
import Vector from "./Vector"

export class HitRecord {
  constructor(public point: Vector, public normal: Vector, public t: number, public frontFace: boolean) {}

  setFaceNormal(ray: Ray, outwardNormal: Vector) {
    this.frontFace = Vector.dot(ray.direction, outwardNormal) < 0
    this.normal = this.frontFace ? outwardNormal : Vector.scale(outwardNormal, -1)
  }
}

/**
 * A hittable object.
 */
export interface IHittable {
  /**
   * Hit test against a ray.
   * If the ray hits the object, returns the hit record.
   * Otherwise, returns null.
   *
   * @param ray Ray to test against
   * @param tMin Minimum distance to test against
   * @param tMax Maximum distance to test against
   * @returns Hit record if the ray hits the object, null otherwise
   */
  hit(ray: Ray, tMin: number, tMax: number): HitRecord | null
}
