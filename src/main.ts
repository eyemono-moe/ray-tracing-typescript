import Color from "./Color"
import Ray from "./Ray"
import Vector from "./Vector"

const rayColor = (ray: Ray): Color => {
  const unitDirection = Vector.normalize(ray.direction)
  const t = 0.5 * (unitDirection.e[1] + 1)
  return Color.add(Color.scale(new Color(1, 1, 1), 1 - t), Color.scale(new Color(0.5, 0.7, 1), t))
}

const main = () => {
  // Image
  const aspectRatio = 16 / 9
  const imageWidth = 400
  const imageHeight = Math.floor(imageWidth / aspectRatio)
  const colorDepth = 4
  const buffer = new Uint8Array(imageWidth * imageHeight * colorDepth)

  // Camera
  const viewportHeight = 2
  const viewportWidth = aspectRatio * viewportHeight
  const focalLength = 1

  const origin = new Vector(0, 0, 0)
  const horizontal = new Vector(viewportWidth, 0, 0)
  const vertical = new Vector(0, viewportHeight, 0)
  const lowerLeftCorner = Vector.sub(
    Vector.sub(Vector.sub(origin, Vector.div(horizontal, 2)), Vector.div(vertical, 2)),
    new Vector(0, 0, focalLength)
  )

  // Render
  for (let j = imageHeight - 1; j >= 0; j--) {
    for (let i = 0; i < imageWidth; i++) {
      const u = i / (imageWidth - 1)
      const v = j / (imageHeight - 1)
      const index = ((imageHeight - j) * imageWidth + i) * colorDepth
      const ray = new Ray(
        origin,
        Vector.sub(
          Vector.add(Vector.add(lowerLeftCorner, Vector.scale(horizontal, u)), Vector.scale(vertical, v)),
          origin
        )
      )
      const pixelColor = rayColor(ray)
      Color.writeColor(pixelColor, index, buffer)
    }
  }

  const canvas = document.getElementById("canvas") as HTMLCanvasElement
  canvas.width = imageWidth
  canvas.height = imageHeight
  const ctx = canvas.getContext("2d")
  if (ctx === null) {
    throw new Error("Failed to get context")
  }
  const buf8 = new Uint8ClampedArray(buffer)
  const imgData = new ImageData(buf8, imageWidth, imageHeight)
  ctx.putImageData(imgData, 0, 0)
}

main()
