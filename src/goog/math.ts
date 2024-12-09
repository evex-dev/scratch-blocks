export class Coordinate {
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
  static equals(a?: Coordinate, b?: Coordinate) {
    if (a === b) {
      return true
    }
    if (!a || !b) {
      return false
    }
    return a.x === b.x && a.y === b.y
  }
  static difference(a: Coordinate, b: Coordinate) {
    return new Coordinate(a.x - b.x, a.y - b.y)
  }
  static magnitude(a: Coordinate) {
    return Math.hypot(a.x, a.y)
  }
  static sum(a: Coordinate, b: Coordinate) {
    return new Coordinate(a.x + b.x, a.y + b.y)
  }
  scale(sx: number, sy?: number) {
    sy ??= sx
    this.x *= sx
    this.y *= sy
    return this
  }
}
export class Size {
  width: number
  height: number
  constructor(w: number, h: number) {
    this.width = w
    this.height = h
  }
}

export class Rect {
  left: number
  top: number
  width: number
  height: number
  constructor(x: number, y: number, w: number, h: number) {
    this.left = x
    this.top = y
    this.width = w
    this.height = h
  }
  contains(another: Coordinate) {
    return another.x >= this.left && another.x <= this.left + this.width &&
    another.y >= this.top && another.y <= this.top + this.height
  }
}
