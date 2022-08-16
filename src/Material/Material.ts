import Color from "../Color"
import { HitRecord } from "../Hittable/Hittable"
import Ray from "../Ray"

export type Scatter =
  | {
      scattered: true
      scatteredRay: Ray
      attenuation: Color
    }
  | {
      scattered: false
    }

export interface IMaterial {
  scatter: (ray: Ray, hitRecord: HitRecord) => Scatter
}

export class Material implements IMaterial {
  scatter(_ray: Ray, _hitRecord: HitRecord): Scatter {
    return {
      scattered: false
    }
  }
}
