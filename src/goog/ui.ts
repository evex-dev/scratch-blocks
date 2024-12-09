export class Menu extends EventTarget {
  #isRight: boolean = false
  #children: MenuItem[] = []
  #elem: Element
  #allowedAutoFocus = false

  constructor() {
    super()
    this.#elem = document.createElement('div')
    this.#elem.className = 'goog-menu goog-menu-vertical'
  }
  setRightToLeft(rtl: boolean) {
    this.#isRight = rtl
  }
  addChild(child: MenuItem) {
    this.#children.push(child)
    child._menu = this
    this.#elem.append(child.getElement())
  }

  render(parent: Element) {
    parent.append(this.#elem)
  }
  getElement(): Element {
    return this.#elem
  }
  setAllowAutoFocus(v: boolean) {
    this.#allowedAutoFocus = v
  }

  _onChecked(checkedChild: MenuItem) {
    for (const child of this.#children) {
      if (child !== checkedChild && child.checkable) {
        child.setChecked(false)
      }
    }
  }
}
class UIEvent extends Event {
  target!: MenuItem
  constructor(name: string, target: EventTarget) {
    super(name)
    Object.defineProperty(this, 'target', { writable: false, value: target })
  }
}

export class MenuItem extends EventTarget {
  #isRight: boolean = false
  #content: string
  #value: string
  checkable: boolean = false
  checked: boolean = false
  _menu?: Menu

  #elem: HTMLDivElement
  constructor(content: string) {
    super()
    this.#content = content

    this.#elem = document.createElement('div')
    this.#elem.className = 'goog-menuitem goog-option'
    this.#elem.onclick = () => {
      const event = new UIEvent('action', this)
      this._menu?.dispatchEvent(event)
    }
    const googMenuItemContent = document.createElement('div')
    googMenuItemContent.className = 'goog-menuitem-content'
    this.#elem.append(googMenuItemContent)
    const googleMenuItemCheckbox = document.createElement('div')
    googleMenuItemCheckbox.className = 'goog-menuitem-checkbox'
    const label = document.createTextNode(content)
    googMenuItemContent.append(googleMenuItemCheckbox, label)
  }
  getElement() {
    return this.#elem
  }
  setRightToLeft(rtl: boolean) {
    this.#isRight = rtl
  }
  setValue(value: string) {
    this.#value = value
  }
  setCheckable(v: boolean) {
    this.checkable = v
  }
  setChecked(v: boolean) {
    this.checked = v
    if (v) {
      this._menu?._onChecked(this)

      this.#elem.classList.add('goog-option-selected')
    } else {
      this.#elem.classList.remove('goog-option-selected')
    }
  }
  getValue() {
    return this.#value
  }
}

const pointerDownedData = new Map<number, boolean>()

export class Slider extends EventTarget {
  #unitIncrement = 1
  #minium = 0
  #maximum = 0
  #moveToPointEnabled = false
  #step = 1
  #value = 0

  #elem: HTMLDivElement
  #thumb: HTMLDivElement
  #thumbRect: DOMRect
  constructor() {
    super()

    this.#elem = document.createElement('div')
    this.#elem.className = 'goog-slider-horizontal'
    this.#elem.role = 'slider'

    const thumb = document.createElement('div')
    thumb.className = 'goog-slider-thumb'
    thumb.role = 'button'
    this.#elem.append(thumb)
    this.#thumbRect = thumb.getBoundingClientRect()

    thumb.onpointerdown = (e) => {
      pointerDownedData.set(e.pointerId, true)
      thumb.setPointerCapture(e.pointerId)
    }
    thumb.onpointermove = (e) => {
      if (!pointerDownedData.get(e.pointerId)) {
        return
      }
      thumb.setPointerCapture(e.pointerId)
      const elemRect = this.#elem.getBoundingClientRect()
      const width = elemRect.width - this.#thumbRect.width
      const rate = Math.max(Math.min((e.clientX - elemRect.left) / width, 1), 0)
      const value = this.#minium + rate * (this.#maximum - this.#minium)
      this.setValue(value)
    }
    thumb.onpointercancel = thumb.onpointerup = (e: PointerEvent) => {
      pointerDownedData.delete(e.pointerId)
      this.#elem.releasePointerCapture(e.pointerId)
    }
    this.#thumb = thumb
  }
  render (container: Element) {
    container.append(this.#elem)
  }
  getElement() {
    return this.#elem
  }

  setUnitIncrement(unitIncrement: number) {
    this.#unitIncrement = unitIncrement
  }
  setMaximum(maxium: number) {
    this.#maximum = maxium
    this.#elem.ariaValueMax = maxium.toString()
  }
  setMinimum(minimum: number) {
    this.#minium = minimum
    this.#elem.ariaValueMin = minimum.toString()
  }
  setMoveToPointEnabled (v: boolean) {
    this.#moveToPointEnabled = v
  }
  setStep (v: number) {
    this.#step = v
  }
  getValue () {
    return this.#value
  }
  setValue(v: number) {
    this.#value = v
    this.#elem.ariaValueNow = v.toString()
    const rect = this.#elem.getBoundingClientRect()
    const width = rect.width - this.#thumbRect.width
    this.#thumb.style.left = `${(v - this.#minium) / (this.#maximum - this.#minium) * width}px`

    this.dispatchEvent(new UIEvent('change', this))
  }
}

export const Component = {
  setDefaultRightToLeft() { },
  // Based on https://github.com/google/closure-library/blob/b312823ec5f84239ff1db7526f4a75cba0420a33/closure/goog/ui/component.js
  EventType: {
    BEFORE_SHOW: 'beforeshow',
    SHOW: 'show',
    HIDE: 'hide',
    DISABLE: 'disable',
    ENABLE: 'enable',
    HIGHLIGHT: 'highlight',
    UNHIGHLIGHT: 'unhighlight',
    ACTIVATE: 'activate',
    DEACTIVATE: 'deactivate',
    SELECT: 'select',
    UNSELECT: 'unselect',
    CHECK: 'check',
    UNCHECK: 'uncheck',
    FOCUS: 'focus',
    BLUR: 'blur',
    OPEN: 'open',
    CLOSE: 'close',
    ENTER: 'enter',
    LEAVE: 'leave',
    ACTION: 'action',
    CHANGE: 'change'
  }
}
export const ColorPicker = {
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
