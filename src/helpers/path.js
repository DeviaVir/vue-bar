import { generateGradientStepsCss } from './gradient'

/**
 *  Calculate the coordinate
 * @param  {number[]|object[]}  arr
 * @param  {object}             boundary
 * @return {object[]}
 */
export function genPoints (arr, { minX, minY, maxX, maxY }) {
  const gridX = (maxX - minX) / (arr.length - 1)
  const gridY = (maxY - minY) / (Math.max(...arr) - Math.min(...arr))

  return arr.map((item, index) => {
    const value = typeof item === 'number' ? item : item.value

    return { x: index * gridX + minX, y: maxY - value * gridY, v: value }
  })
}

export function genBars (_this, arr, h) {
  let { minX, minY, maxX, maxY } = _this.boundary
  const totalWidth = (maxX) / (arr.length-1)
  if (!_this.barWidth) {
    _this.barWidth = totalWidth - (_this.padding || 5)
  }
  if (!_this.rounding) {
    _this.rounding = 2
  }

  const gradients = generateGradientStepsCss(_this.gradient[0], _this.gradient[1], (arr.length-1))
  const offsetX = (totalWidth - _this.barWidth) / 2

  return arr.map((item, index) => {
    return h('rect', {
      attrs: {
        id: `bar-id-${index}`,
        fill: gradients[index],
        x: item.x - offsetX,
        y: 0,
        width: _this.barWidth,
        height: (maxY - item.y),
        rx: _this.rounding,
        ry: _this.rounding
      }
    }, [
      h('animate', {
        attrs: {
          attributeName: 'height',
          from: 0,
          to: (maxY - item.y),
          dur: `${_this.growDuration}s`,
          fill: 'freeze'
        }
      }),
      h('title', {}, [item.v])
    ])
  })
}