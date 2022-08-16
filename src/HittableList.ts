import { HitRecord, IHittable } from "./Hittable"
import Ray from "./Ray"

export default class HittableList implements IHittable {
  public objects: IHittable[] = []
  constructor(objects?: IHittable[]) {
    if (objects) {
      this.objects = objects
    }
  }

  hit(ray: Ray, tMin: number, tMax: number): HitRecord | null {
    let closestSoFar = tMax
    let ClosestHitRecord: HitRecord | null = null
    for (const hittable of this.objects) {
      const hitRecord = hittable.hit(ray, tMin, closestSoFar)
      if (hitRecord) {
        closestSoFar = hitRecord.t
        ClosestHitRecord = hitRecord
      }
    }
    return ClosestHitRecord
  }

  add(hittable: IHittable) {
    this.objects.push(hittable)
  }

  clear() {
    this.objects = []
  }
}
