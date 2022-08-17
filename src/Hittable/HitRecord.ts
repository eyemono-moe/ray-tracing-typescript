import IMaterial from "../Material/Material"
import Vector from "../Vector"

type HitRecord = {
  point: Vector
  normal: Vector
  material: IMaterial
  t: number
  frontFace: boolean
}
export default HitRecord
