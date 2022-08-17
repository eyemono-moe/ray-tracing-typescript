import PerspectiveCamera from "./Camera/PerspectiveCamera"
import Color from "./Color"
import IHittable from "./Hittable/IHittable"
import HittableList from "./Hittable/HittableList"
import Ray from "./Ray"
import Sphere from "./Hittable/Sphere"
import Vector from "./Vector"
import Lambertian from "./Material/Lambertian"
import Metal from "./Material/Metal"
import Dielectric from "./Material/Dielectric"

const rayColor = (ray: Ray, world: IHittable, depth: number): Color => {
  // If we've exceeded the ray bounce limit, no more light is gathered.
  if (depth <= 0) {
    return new Color(0, 0, 0)
  }

  const hitRecord = world.hit(ray, 0.001, Infinity)
  if (hitRecord) {
    const scatter = hitRecord.material.scatter(ray, hitRecord)
    if (scatter.scattered) {
      return Color.mul(scatter.attenuation, rayColor(scatter.scatteredRay, world, depth - 1))
    }
    return new Color(0, 0, 0)
  }
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
  const samplePerPixel = 100
  const maxDepth = 50

  // World
  const world = new HittableList()
  world.add(new Sphere(new Vector(0, 0, -1), 0.5, new Lambertian(new Color(0.1, 0.2, 0.5))))
  world.add(new Sphere(new Vector(0, -100.5, -1), 100, new Lambertian(new Color(0.8, 0.8, 0))))
  world.add(new Sphere(new Vector(1, 0, -1), 0.5, new Metal(new Color(0.8, 0.6, 0.2), 0.3)))
  world.add(new Sphere(new Vector(-1, 0, -1), 0.5, new Dielectric(1.5)))
  world.add(new Sphere(new Vector(-1, 0, -1), -0.45, new Dielectric(1.5)))

  // Camera
  const camera = new PerspectiveCamera(new Vector(0, 0, 0), 2, aspectRatio)

  // Render
  for (let j = imageHeight - 1; j >= 0; j--) {
    for (let i = 0; i < imageWidth; i++) {
      let pixelColor = new Color(0, 0, 0)
      for (let s = 0; s < samplePerPixel; s++) {
        const u = (i + Math.random()) / (imageWidth - 1)
        const v = (j + Math.random()) / (imageHeight - 1)
        const ray = camera.getRay(u, v)
        pixelColor = Color.add(pixelColor, rayColor(ray, world, maxDepth))
      }
      const index = ((imageHeight - j) * imageWidth + i) * colorDepth
      Color.writeColor(pixelColor, index, buffer, samplePerPixel)
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
