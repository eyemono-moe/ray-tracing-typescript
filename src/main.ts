import Color from "./Color"

const main = () => {
  const imageWidth = 256
  const imageHeight = 256
  const colorDepth = 4

  const buffer = new Uint8Array(imageWidth * imageHeight * colorDepth)

  for (let j = 0; j < imageHeight; j++) {
    for (let i = 0; i < imageWidth; i++) {
      const index = ((imageHeight - j) * imageWidth + i) * colorDepth
      const pixelColor = new Color(i / imageWidth, j / imageHeight, 0.25)
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
