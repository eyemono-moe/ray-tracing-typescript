import Ray from "../Ray"
import HitRecord from "./HitRecord"

/**
 * A hittable object.
 */
export default interface IHittable {
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
