const toHex = (n: number) => n.toString(16).padStart(2, '0')

type RGB = [r: number, g: number, b: number]

export const rgbToHex = (r: number, g: number, b: number) => `#${toHex(r)}${toHex(g)}${toHex(b)}`
export const rgbArrayToHex = ([r, g, b]: RGB) => rgbToHex(r, g, b)
export const hexToRgb = (hex: string): RGB => {
  hex = hex.slice(1)

  if (hex.length === 3) {
    // handle 3-chars color code like #aaa
    hex = hex.split('').map(char => char + char).join('')
  }

  const int = parseInt(hex.slice(0), 16)
  const r = (int >> 16) & 0xff
  const g = (int >> 8) & 0xff
  const b = int & 0xff

  return [r, g, b]
}

export const blend = (rgb1: RGB, rgb2: RGB, factor: number): RGB => {
  factor = Math.min(Math.max(factor, 0), 1)

  return [
    Math.round(rgb2[0] + factor * (rgb1[0] - rgb2[0])),
    Math.round(rgb2[1] + factor * (rgb1[1] - rgb2[1])),
    Math.round(rgb2[2] + factor * (rgb1[2] - rgb2[2]))
  ]
}

export const darken = (rgb: RGB, factor: number): RGB => blend(rgb, [0, 0, 0], factor)

