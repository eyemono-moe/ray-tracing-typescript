import Vector from "./Vector"

export default class Color extends Vector {
  constructor(r: number, g: number, b: number) {
    super(r, g, b)
  }

  /**
   * Returns a color with each component in the range [0, 1].
   *
   * @param c
   * @returns Legalized color
   */
  static legalize(c: Color) {
    return new Color(
      Math.min(Math.max(c.e[0], 0), 1),
      Math.min(Math.max(c.e[1], 0), 1),
      Math.min(Math.max(c.e[2], 0), 1)
    )
  }

  /**
   * Writes a color to the buffer.
   *
   * @param c
   * @param i index of where to write the color
   * @param buf
   * @param samplePerPixel
   */
  static writeColor(c: Color, i: number, buf: Uint8Array, samplePerPixel: number) {
    const scaled = Color.div(c, samplePerPixel)
    const gammaCollected = Color.pow(scaled, 1 / 2.2)
    const legal = Color.scale(Color.legalize(gammaCollected), 255)
    buf[i] = legal.e[0]
    buf[i + 1] = legal.e[1]
    buf[i + 2] = legal.e[2]
    buf[i + 3] = 255
  }
}
