import Ray from "../Ray"
import Vector from "../Vector"
import ICamera from "./ICamera"

export default class PerspectiveCamera implements ICamera {
  origin: Vector
  lowerLeftCorner: Vector
  horizontal: Vector
  vertical: Vector

  u: Vector
  v: Vector
  w: Vector
  lensRadius: number
  constructor(
    lookFrom: Vector,
    lookAt: Vector,
    vUp: Vector,
    vFov: number,
    aspectRatio: number,
    aperture: number,
    focusDist: number
  ) {
    const theta = (vFov * Math.PI) / 180
    const halfHeight = Math.tan(theta / 2)
    const viewportHeight = 2.0 * halfHeight
    const viewportWidth = aspectRatio * viewportHeight

    this.w = Vector.normalize(Vector.sub(lookFrom, lookAt))
    this.u = Vector.normalize(Vector.cross(vUp, this.w))
    this.v = Vector.cross(this.w, this.u)

    this.origin = lookFrom
    this.horizontal = Vector.scale(this.u, viewportWidth)
    this.vertical = Vector.scale(this.v, viewportHeight)
    this.lowerLeftCorner = Vector.sub(
      Vector.sub(Vector.sub(this.origin, Vector.div(this.horizontal, 2)), Vector.div(this.vertical, 2)),
      Vector.scale(this.w, focusDist)
    )

    this.lensRadius = aperture / 2
  }
  getRay(s: number, t: number): Ray {
    const rd = Vector.scale(Vector.randomInUnitDisk(), this.lensRadius)
    const offset = Vector.add(Vector.scale(this.u, rd.e[0]), Vector.scale(this.v, rd.e[1]))

    return new Ray(
      Vector.add(this.origin, offset),
      Vector.sub(
        Vector.sub(
          Vector.add(
            Vector.add(this.lowerLeftCorner, Vector.scale(this.horizontal, s)),
            Vector.scale(this.vertical, t)
          ),
          this.origin
        ),
        offset
      )
    )
  }
}
