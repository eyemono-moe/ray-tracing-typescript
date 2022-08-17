import Ray from "../Ray"
import Vector from "../Vector"

export default interface ICamera {
  origin: Vector
  lowerLeftCorner: Vector
  horizontal: Vector
  vertical: Vector
  getRay: (u: number, v: number) => Ray
}
