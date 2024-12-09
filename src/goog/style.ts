import { Coordinate, Size } from './math'

export const getViewportPageOffset = (doc: Document) => {
  const body = doc.body
  const documentElement = doc.documentElement
  const scrollLeft = body.scrollLeft || documentElement.scrollLeft
  const scrollTop = body.scrollTop || documentElement.scrollTop
  return new Coordinate(scrollLeft, scrollTop)
}
export const getPageOffset = (elem: Element) => {
  const rect = elem.getBoundingClientRect()
  return new Coordinate(rect.left + window.pageXOffset, rect.top + window.pageYOffset)
}
export const getSize = (elem: Element) => {
  const rect = elem.getBoundingClientRect()
  return new Size(rect.width, rect.height)
}
