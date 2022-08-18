import Ray from "../Ray"
import Vector from "../Vector"
import ICamera from "./ICamera"

export default class PerspectiveCamera implements ICamera {
  origin: Vector
  lowerLeftCorner: Vector
  horizontal: Vector
  vertical: Vector
  constructor(lookFrom: Vector, lookAt: Vector, vUp: Vector, vFov: number, aspectRatio: number) {
    const theta = (vFov * Math.PI) / 180
    const halfHeight = Math.tan(theta / 2)
    const viewportHeight = 2.0 * halfHeight
    const viewportWidth = aspectRatio * viewportHeight

    const w = Vector.normalize(Vector.sub(lookFrom, lookAt))
    const u = Vector.normalize(Vector.cross(vUp, w))
    const v = Vector.cross(w, u)

    this.origin = lookFrom
    this.horizontal = Vector.scale(u, viewportWidth)
    this.vertical = Vector.scale(v, viewportHeight)
    this.lowerLeftCorner = Vector.sub(
      Vector.sub(Vector.sub(this.origin, Vector.div(this.horizontal, 2)), Vector.div(this.vertical, 2)),
      w
    )
  }
  getRay(u: number, v: number): Ray {
    return new Ray(
      this.origin,
      Vector.sub(
        Vector.add(Vector.add(this.lowerLeftCorner, Vector.scale(this.horizontal, u)), Vector.scale(this.vertical, v)),
        this.origin
      )
    )
  }
}
