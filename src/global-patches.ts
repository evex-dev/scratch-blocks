import DefaultBlockly from './default-blockly'
import * as color from './goog/color'
import * as math from './goog/math'
import * as style from './goog/style'
import * as ui from './goog/ui'
import * as events from './goog/events'

export const Blockly = DefaultBlockly

export const goog = {
  events,
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
  math,
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
  isDef(val: unknown): boolean {
    return val !== undefined
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
    },
    htmlEscape(str: string) {
      return str.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;')
    }
  },
  dom: {
    contains(parent?: Element, child?: Element) {
      if (!parent || !child) {
        return
      }
      return parent.contains(child)
    },
    createDom(tag?: string, attrs?: Record<string, string> | string | string[], children?: (undefined | null | Node | string)[] | undefined | null | Node | string): Element {
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
        for (const child of Array.isArray(children) ? children : [children]) {
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
  ui,
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
  color,
  style
}
