import { generateGradientStepsCss } from './gradient'

/**
 *  Calculate the coordinate
 * @param  {number[]|object[]}  arr
 * @param  {object}             boundary
 * @return {object[]}
 */
export function genPoints (inArr, { minX, minY, maxX, maxY }, { max, min }) {
  let arr = inArr.map(item => (typeof item === 'number' ? item : item.value))
  const minValue = Math.min(...arr, min) - 0.001
  const gridX = (maxX - minX) / (arr.length - 1)
  const gridY = (maxY - minY) / (Math.max(...arr, max) + 0.001 - minValue)

  return arr.map((value, index) => {
    const title = typeof inArr[index] === 'number' ? inArr[index] : inArr[index].title;
    return {
      x: index * gridX + minX,
      y:
        maxY -
        (value - minValue) * gridY +
        +(index === arr.length - 1) * 0.00001 -
        +(index === 0) * 0.00001,
      v: title
    }
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
