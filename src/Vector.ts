export default class Vector {
  public e: Array<number> = [0, 0, 0]
  constructor(x: number, y: number, z: number) {
    this.e[0] = x
    this.e[1] = y
    this.e[2] = z
  }

  static add(v1: Vector, v2: Vector): Vector {
    return new Vector(v1.e[0] + v2.e[0], v1.e[1] + v2.e[1], v1.e[2] + v2.e[2])
  }

  static sub(v1: Vector, v2: Vector): Vector {
    return new Vector(v1.e[0] - v2.e[0], v1.e[1] - v2.e[1], v1.e[2] - v2.e[2])
  }

  static scale(v: Vector, s: number): Vector {
    return new Vector(v.e[0] * s, v.e[1] * s, v.e[2] * s)
  }

  static mul(v1: Vector, v2: Vector): Vector {
    return new Vector(v1.e[0] * v2.e[0], v1.e[1] * v2.e[1], v1.e[2] * v2.e[2])
  }

  static div(v: Vector, s: number): Vector {
    return new Vector(v.e[0] / s, v.e[1] / s, v.e[2] / s)
  }

  static pow(v: Vector, s: number): Vector {
    return new Vector(Math.pow(v.e[0], s), Math.pow(v.e[1], s), Math.pow(v.e[2], s))
  }

  /**
   * Returns the length of the vector.
   *
   * @param v
   * @returns Vector length
   */
  static mag(v: Vector): number {
    return Math.sqrt(Vector.lengthSquared(v))
  }

  /**
   * Returns the length of the vector squared.
   *
   * @param v
   * @returns Vector length squared
   */
  static lengthSquared(v: Vector): number {
    return v.e[0] * v.e[0] + v.e[1] * v.e[1] + v.e[2] * v.e[2]
  }

  /**
   * Returns the dot product of two vectors.
   *
   * @param v1
   * @param v2
   * @returns Dot product
   */
  static dot(v1: Vector, v2: Vector): number {
    return v1.e[0] * v2.e[0] + v1.e[1] * v2.e[1] + v1.e[2] * v2.e[2]
  }

  /**
   * Returns the cross product of two vectors.
   *
   * @param v1
   * @param v2
   * @returns Cross product
   */
  static cross(v1: Vector, v2: Vector): Vector {
    return new Vector(
      v1.e[1] * v2.e[2] - v1.e[2] * v2.e[1],
      v1.e[2] * v2.e[0] - v1.e[0] * v2.e[2],
      v1.e[0] * v2.e[1] - v1.e[1] * v2.e[0]
    )
  }

  /**
   * Returns the unit vector of the vector.
   * If the vector is the zero vector, returns the zero vector.
   *
   * @param v
   * @returns Normalized vector
   */
  static normalize(v: Vector): Vector {
    const mag = Vector.mag(v)
    if (mag === 0) {
      return new Vector(0, 0, 0)
    }
    return Vector.div(v, mag)
  }

  /**
   * Returns the random vector on the unit sphere.
   *
   * @returns Random vector on the unit sphere
   */
  static randomUnitVector() {
    const theta = Math.random() * 2 * Math.PI
    const phi = 1 - 2 * Math.random()
    const r = Math.sqrt(1 - phi * phi)
    return new Vector(r * Math.cos(theta), r * Math.sin(theta), phi)
  }

  /**
   * Returns the reflected vector across the given normal.
   *
   * @param v Vector to reflect
   * @param n Normal to reflect across
   * @returns Reflected vector
   */
  static reflect(v: Vector, n: Vector): Vector {
    return Vector.sub(v, Vector.scale(n, 2 * Vector.dot(v, n)))
  }

  /**
   * Returns the refracted vector across the given normal.
   * Returns a zero vector if total reflection occurs.
   *
   * @param uv Unit vector
   * @param n
   * @param niOverNt Ratio of indices of refraction
   */
  static refract(uv: Vector, n: Vector, niOverNt: number): Vector {
    const dt = Vector.dot(uv, n)
    const descriminant = 1 - niOverNt * niOverNt * (1 - dt * dt)
    if (descriminant > 0) {
      return Vector.sub(
        Vector.scale(Vector.sub(uv, Vector.scale(n, dt)), niOverNt),
        Vector.scale(n, Math.sqrt(descriminant))
      )
    }
    return new Vector(0, 0, 0)
  }
}
