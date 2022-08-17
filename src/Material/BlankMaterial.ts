import HitRecord from "../Hittable/HitRecord"
import Ray from "../Ray"
import IMaterial from "./Material"
import Scatter from "./Scatter"

export default class BlankMaterial implements IMaterial {
  scatter(_ray: Ray, _hitRecord: HitRecord): Scatter {
    return {
      scattered: false
    }
  }
}
