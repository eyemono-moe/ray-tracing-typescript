import Color from "../Color"

describe("Color", () => {
  test("constructor", () => {
    const c = new Color(1, 2, 3)
    expect(c.e[0]).toBe(1)
    expect(c.e[1]).toBe(2)
    expect(c.e[2]).toBe(3)
  })

  test("legalize", () => {
    const c = new Color(1, -2, 3)
    const c2 = Color.legalize(c)
    expect(c2.e[0]).toBe(1)
    expect(c2.e[1]).toBe(0)
    expect(c2.e[2]).toBe(1)
  })

  test("writeColor", () => {
    const c = new Color(1, 0, 0.5)
    const buf = new Uint8Array(4)
    Color.writeColor(c, 0, buf)
    expect(buf[0]).toBe(255)
    expect(buf[1]).toBe(0)
    expect(buf[2]).toBe(127)
    expect(buf[3]).toBe(255)
  })
})
