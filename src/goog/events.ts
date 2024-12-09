export const listen = (src: EventTarget, type: string, listener: () => void) => {
  src.addEventListener(type, listener)
}
export const BrowserFeature = {
  TOUCH_ENABLED: 'ontouchstart' in window
}
