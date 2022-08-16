import Ray from "./Ray"
import Vector from "./Vector"

export type HitRecord = {
  point: Vector
  normal: Vector
  t: number
  frontFace: boolean
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
