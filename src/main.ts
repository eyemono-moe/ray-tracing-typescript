const main = () => {
  const imageWidth = 256
  const imageHeight = 256
  const colorDepth = 4

  const buffer = new Uint8Array(imageWidth * imageHeight * colorDepth)

  for (let j = 0; j < imageHeight; j++) {
    for (let i = 0; i < imageWidth; i++) {
      const index = ((imageHeight - j) * imageWidth + i) * colorDepth
      buffer[index] = (i * 255) / (imageWidth - 1)
      buffer[index + 1] = (j * 255) / (imageHeight - 1)
      buffer[index + 2] = 64
      buffer[index + 3] = 255
    }
  }

  const canvas = document.getElementById("canvas") as HTMLCanvasElement
  canvas.width = imageWidth
  canvas.height = imageHeight
  const ctx = canvas.getContext("2d")!
  const buf8 = new Uint8ClampedArray(buffer)
  const imgData = new ImageData(buf8, imageWidth, imageHeight)
  ctx.putImageData(imgData, 0, 0)
}

main()

export {}
