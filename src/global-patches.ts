import DefaultBlockly from './default-blockly'
import * as color from './goog/color'

export const Blockly = DefaultBlockly

export const goog = {
  events: {
    BrowserFeature: {
      TOUCH_ENABLED: 'ontouchstart' in window
    }
  },
  inherits(childCtor, parentCtor) {
    /** @constructor */
    function tempCtor() { };
    tempCtor.prototype = parentCtor.prototype;
    childCtor.prototype = new tempCtor();
    childCtor.prototype.constructor = childCtor;
    for (const key in parentCtor) {
      childCtor[key] = parentCtor[key]
    }
    childCtor.superClass_ = parentCtor.prototype
  },
  math: {
    Coordinate: class Coordinate {
      x: number
      y: number
      constructor(x: number, y: number) {
        this.x = x
        this.y = y
      }
      static equals(a?: typeof goog.math.Coordinate.prototype, b?: typeof goog.math.Coordinate.prototype) {
        if (a === b) {
          return true
        }
        if (!a || !b) {
          return false
        }
        return a.x === b.x && a.y === b.y
      }
      static difference(a: typeof goog.math.Coordinate.prototype, b: typeof goog.math.Coordinate.prototype) {
        return new goog.math.Coordinate(a.x - b.x, a.y - b.y)
      }
      static magnitude(a: typeof goog.math.Coordinate.prototype) {
        return Math.hypot(a.x, a.y)
      }
      static sum(a: typeof goog.math.Coordinate.prototype, b: typeof goog.math.Coordinate.prototype) {
        return new goog.math.Coordinate(a.x + b.x, a.y + b.y)
      }
      scale(sx: number, sy?: number) {
        sy ??= sx
        this.x *= sx
        this.y *= sy
        return this
      }
    },
    Size: class Size {
      width: number
      height: number
      constructor(w: number, h: number) {
        this.width = w
        this.height = h
      }
    },
    Rect: class Rect {
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
      contains(another: typeof goog.math.Coordinate['prototype']) {
        return another.x >= this.left && another.x <= this.left + this.width &&
        another.y >= this.top && another.y <= this.top + this.height
      }
    }
  },
  global: {
    console,
    Blockly
  },
  isString(val: unknown): val is string {
    return typeof val === 'string' || val instanceof String
  },
  isObject(val: unknown): val is object {
    return val !== null && val !== undefined
  },
  isFunction(val: unknown): val is Function {
    return typeof val === 'function' || val instanceof Function
  },
  isNumber(val: unknown): val is number {
    return typeof val === 'number' || val instanceof Number
  },
  string: {
    isEmptyOrWhitespace(v: string): boolean {
      return v == null || v.trim() === ''
    },
    repeat(s: string, n: number): string {
      return s.repeat(n)
    },
    caseInsensitiveEquals(a: string, b: string): boolean {
      return a.toLowerCase() === b.toLowerCase()
    }
  },
  dom: {
    contains(parent?: Element, child?: Element) {
      if (!parent || !child) {
        return
      }
      return parent.contains(child)
    },
    createDom(tag?: string, attrs?: Record<string, string> | string | string[], children?: (undefined | null | Node | string)[]): Element {
      const elem = document.createElement(String(tag))
      if (attrs) {
        if (typeof attrs === 'string') {
          elem.className = attrs
        } else if (Array.isArray(attrs)) {
          elem.className = attrs.join(' ')
        } else {
          for (const key in attrs) {
            // @ts-ignore
            elem[key] = attrs[key]
          }
        }
      }
      if (children) {
        for (const child of children) {
          if (child === null || child === undefined) {
            continue
          }
          elem.append(child instanceof Node ? child : String(child))
        }
      }
      return elem
    },
    TagName: new Proxy({}, {
      get(_target, p) {
        return p.toString().toLowerCase()
      },
    }),
    getDocumentScroll() {
      return new goog.math.Coordinate(window.pageXOffset, window.pageYOffset)
    },
    insertSiblingAfter(newNode?: Node, refNode?: Node) {
      if (!(newNode && refNode)) {
        return
      }
      refNode.parentNode?.insertBefore(newNode, refNode.nextSibling)
    },
    removeNode(node: Node) {
      return node && node.parentNode ? node.parentNode.removeChild(node) : null
    },
    removeChildren(parentNode: Node) {
      let child: Node | null
      while (child = parentNode.firstChild) {
        child && parentNode.removeChild(child)
      }
    }
  },
  ui: {
    Component: {
      setDefaultRightToLeft() { }
    },
    ColorPicker: {
      /*! https://github.com/google/closure-library/blob/b312823ec5f84239ff1db7526f4a75cba0420a33/closure/goog/ui/colorpicker.js */
      SIMPLE_GRID_COLORS: [
        // grays
        '#ffffff', '#cccccc', '#c0c0c0', '#999999', '#666666', '#333333', '#000000',
        // reds
        '#ffcccc', '#ff6666', '#ff0000', '#cc0000', '#990000', '#660000', '#330000',
        // oranges
        '#ffcc99', '#ff9966', '#ff9900', '#ff6600', '#cc6600', '#993300', '#663300',
        // yellows
        '#ffff99', '#ffff66', '#ffcc66', '#ffcc33', '#cc9933', '#996633', '#663333',
        // olives
        '#ffffcc', '#ffff33', '#ffff00', '#ffcc00', '#999900', '#666600', '#333300',
        // greens
        '#99ff99', '#66ff99', '#33ff33', '#33cc00', '#009900', '#006600', '#003300',
        // turquoises
        '#99ffff', '#33ffff', '#66cccc', '#00cccc', '#339999', '#336666', '#003333',
        // blues
        '#ccffff', '#66ffff', '#33ccff', '#3366ff', '#3333ff', '#000099', '#000066',
        // purples
        '#ccccff', '#9999ff', '#6666cc', '#6633ff', '#6600cc', '#333399', '#330099',
        // violets
        '#ffccff', '#ff99ff', '#cc66cc', '#cc33cc', '#993399', '#663366', '#330033'
      ]
    }
  },
  asserts: {
    assert() { },
    assertObject() {}
  },
  userAgent: {
    IPAD: navigator.userAgent.includes('iPad'),
    ANDROID: navigator.userAgent.includes('Android'),
    GECKO: navigator.userAgent.includes('Gecko'),
    EDGE: navigator.userAgent.includes('Edge'),
    WEBKIT: navigator.userAgent.includes('WebKit')
  },
  mixin(target, ...sources) {
    sources.forEach(source => {
      if (source && typeof source === 'object') {
        for (const key in source) {
          target[key] = source[key];
        }
      }
    })
  },
  array: {
    clone<T>(arr: T[]): T[] {
      return [...arr]
    },
    remove(arr: unknown[], target: unknown): boolean {
      const index = arr.indexOf(target)
      if (index !== -1) {
        arr.splice(index, 1)
        return true
      }
      return false
    }
  },
  color
}

