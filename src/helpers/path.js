import { generateGradientStepsCss } from './gradient'

/**
 *  Calculate the coordinate
 * @param  {number[]|object[]}  arr
 * @param  {object}             boundary
 * @return {object[]}
 */
export function genPoints (inArr, { minX, minY, maxX, maxY, minBarHeight }, { max, min }) {
  const arr = inArr.map(item => (typeof item === 'number' ? item : item.value))
  const minValue = Math.min(...arr, min)
  const maxValue = Math.max(...arr, max)
  const absMaxVal = Math.abs(maxValue)
  const absMinVal = Math.abs(minValue)
  const gridX = (maxX - minX) / (arr.length - 1)

  let delta = 0
  if (minValue < 0 && maxValue < 0) {
    delta = absMinVal
  } else if (minValue < 0 && maxValue >= 0) {
    delta = absMinVal + absMaxVal
  } else if (minValue >= 0 && maxValue >= 0) {
    delta = maxValue
  }

  const heightMultiplier = delta !== 0 ? (maxY - minY) / delta : 1
  const zeroLine = minValue < 0 ? absMinVal : 0

  return arr.map((value, index) => {
    const title = typeof inArr[index] === 'number' ? inArr[index] : inArr[index].title
    const height = Math.abs(value)
    const barHeight = height * heightMultiplier > minBarHeight ? height * heightMultiplier : minBarHeight
    return {
      x: index * gridX + minX,
      y: value >= 0 || value === 0 && minValue >= 0 ? zeroLine * heightMultiplier : zeroLine * heightMultiplier - barHeight,
      height: barHeight,
      v: title
    }
  })
}

export function genBars (_this, arr, h) {
  const { maxX } = _this.boundary
  const totalWidth = (maxX) / (arr.length - 1)
  if (!_this.barWidth) {
    _this.barWidth = totalWidth - (_this.padding || 5)
  }
  if (!_this.rounding) {
    _this.rounding = 2
  }

  let gradients = 0
  if (_this.gradient && _this.gradient.length > 1) {
    gradients = generateGradientStepsCss(_this.gradient[0], _this.gradient[1], (arr.length - 1))
  }
  const offsetX = (totalWidth - _this.barWidth) / 2

  return arr.map((item, index) => {
    return h('rect', {
      attrs: {
        id: `bar-id-${index}`,
        fill: (gradients ? gradients[index] : (_this.gradient[0] ? _this.gradient[0] : '#000')),
        x: item.x - offsetX,
        y: item.y,
        width: _this.barWidth,
        height: item.height,
        rx: _this.rounding,
        ry: _this.rounding
      }
    }, [
      h('animate', {
        attrs: {
          attributeName: 'height',
          from: 0,
          to: item.height,
          dur: `${_this.growDuration}s`,
          fill: 'freeze'
        }
      }),
      h('title', {}, [item.v])
    ])
  })
}
