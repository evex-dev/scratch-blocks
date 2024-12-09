const toHex = (n: number) => n.toString(16).padStart(2, '0')

type Vec3 = [r: number, g: number, b: number]

export const rgbToHex = (r: number, g: number, b: number) => `#${toHex(r)}${toHex(g)}${toHex(b)}`
export const rgbArrayToHex = ([r, g, b]: Vec3) => rgbToHex(r, g, b)
export const hexToRgb = (hex: string): Vec3 => {
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

export const blend = (rgb1: Vec3, rgb2: Vec3, factor: number): Vec3 => {
  factor = Math.min(Math.max(factor, 0), 1)

  return [
    Math.round(rgb2[0] + factor * (rgb1[0] - rgb2[0])),
    Math.round(rgb2[1] + factor * (rgb1[1] - rgb2[1])),
    Math.round(rgb2[2] + factor * (rgb1[2] - rgb2[2]))
  ]
}

export const darken = (rgb: Vec3, factor: number): Vec3 => blend(rgb, [0, 0, 0], factor)

export const rgbToHsv = (r, g, b): Vec3 => {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min

  let h = 0
  if (delta !== 0) {
    if (max === r) {
      h = ((g - b) / delta + (g < b ? 6 : 0)) * 60
    } else if (max === g) {
      h = ((b - r) / delta + 2) * 60
    } else {
      h = ((r - g) / delta + 4) * 60
    }
  }

  const s = max === 0 ? 0 : delta / max
  const v = max

  return [h, s, v]
}
export const hsvToRgb = (h: number, s: number, v: number): Vec3 => {
  v = v / 255

  const c = v * s
  const x = c * (1 - Math.abs((h / 60) % 2 - 1))
  const m = v - c

  let r = 0, g = 0, b = 0

  if (h >= 0 && h < 60) {
      [r, g, b] = [c, x, 0]
  } else if (h >= 60 && h < 120) {
      [r, g, b] = [x, c, 0]
  } else if (h >= 120 && h < 180) {
      [r, g, b] = [0, c, x]
  } else if (h >= 180 && h < 240) {
      [r, g, b] = [0, x, c]
  } else if (h >= 240 && h < 300) {
      [r, g, b] = [x, 0, c]
  } else if (h >= 300 && h <= 360) {
      [r, g, b] = [c, 0, x]
  }

  return [
      Math.round((r + m) * 255),
      Math.round((g + m) * 255),
      Math.round((b + m) * 255),
  ];
}

export const hexToHsv = (hex: string): Vec3 => rgbToHsv(...hexToRgb(hex))
export const hsvToHex = (h: number, s: number, v: number): string => rgbToHex(...hsvToRgb(h, s, v))