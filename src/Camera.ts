import Ray from "./Ray"
import Vector from "./Vector"

export interface ICamera {
  origin: Vector
  lowerLeftCorner: Vector
  horizontal: Vector
  vertical: Vector
  getRay: (u: number, v: number) => Ray
}

export class Camera implements ICamera {
  lowerLeftCorner: Vector
  horizontal: Vector
  vertical: Vector
  constructor(public origin: Vector, viewportHeight: number, aspectRatio: number) {
    const viewportWidth = aspectRatio * viewportHeight
    const focalLength = 1.0
    this.horizontal = new Vector(viewportWidth, 0, 0)
    this.vertical = new Vector(0, viewportHeight, 0)
    this.lowerLeftCorner = Vector.sub(
      Vector.sub(Vector.sub(origin, Vector.div(this.horizontal, 2)), Vector.div(this.vertical, 2)),
      new Vector(0, 0, focalLength)
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
