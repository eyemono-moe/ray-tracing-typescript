import HitRecord from "../Hittable/HitRecord"
import Ray from "../Ray"
import Scatter from "./Scatter"

export default interface IMaterial {
  scatter: (ray: Ray, hitRecord: HitRecord) => Scatter
}
