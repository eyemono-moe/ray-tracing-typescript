import Vector from "./Vector"

export default class Ray {
  constructor(public origin: Vector, public direction: Vector) {}

  at(t: number): Vector {
    return Vector.add(this.origin, Vector.scale(this.direction, t))
  }
}
