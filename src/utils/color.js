export function isRgbOrRgba(color) {
  return color.includes('rgb') || color.includes('rgba')
}

export function isHex(color) {
  return color.includes('#')
}

export function hexToRgba(hex) {
  const r = Number.parseInt(hex.slice(1, 3), 16)
  const g = Number.parseInt(hex.slice(3, 5), 16)
  const b = Number.parseInt(hex.slice(5, 7), 16)
  return { r, g, b }
}

export function rgbToRgba(rgb) {
  const rgbArr = rgb.split('(')[1].split(')')[0].split(',')
  return { r: rgbArr[0], g: rgbArr[1], b: rgbArr[2] }
}

export function rgba(color, opacity) {
  opacity = opacity || 1
  let rgbaStr = ''
  if (isHex(color)) {
    const { r, g, b } = hexToRgba(color)
    rgbaStr = `rgba(${r},${g},${b},${opacity})`
  }
  else {
    const { r, g, b } = rgbToRgba(color)
    rgbaStr = `rgba(${r},${g},${b},${opacity})`
  }
  return rgbaStr
}

export function rgbToHex(color) {
  color = color.replace(/\s+/g, '')
  const rgbaMatch = color.match(/^rgba?\((\d+),(\d+),(\d+),?(\d*\.?\d+)?\)$/i)
  if (!rgbaMatch) throw new Error('Invalid color format')
  const r = parseInt(rgbaMatch[1], 10)
  const g = parseInt(rgbaMatch[2], 10)
  const b = parseInt(rgbaMatch[3], 10)
  const a = rgbaMatch[4] !== undefined ? parseFloat(rgbaMatch[4]) : undefined
  let hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  if (a !== undefined) {
    let alphaHex = Math.round(a * 255).toString(16).toUpperCase()
    if (alphaHex.length === 1) alphaHex = '0' + alphaHex
    hex += alphaHex
  }
  return hex
}
