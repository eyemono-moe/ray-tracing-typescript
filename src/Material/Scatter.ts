import Color from "../Color"
import Ray from "../Ray"

type Scatter =
  | {
      scattered: true
      scatteredRay: Ray
      attenuation: Color
    }
  | {
      scattered: false
    }
export default Scatter
