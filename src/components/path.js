import { genPoints, genBars } from '../helpers/path'

export default {
  props: ['smooth', 'data', 'boundary', 'barWidth', 'rounding', 'id', 'gradient', 'growDuration'],

  render (h) {
    const points = genPoints(this.data, this.boundary)
    const bars = genBars(this, points, h)

    return h('g', {
      attrs: {
        transform: `scale(1,-1) translate(0,-${this.boundary.maxY})`
      }
    }, bars)
  }
}
