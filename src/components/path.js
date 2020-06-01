import { genPoints, genBars, genLabels } from '../helpers/path'

export default {
  props: ['data', 'boundary', 'barWidth', 'rounding', 'id', 'gradient', 'growDuration', 'max', 'min', 'labelData', 'labelProps'],

  render (h) {
    const { data, boundary, max, min, labelData } = this
    const points = genPoints(data, boundary, { max, min }, labelData.length)
    const labels = genLabels(this, points, labelData, h)
    let bars = genBars(this, points, h)

    if (labels.children.length) {
      bars = bars.concat(labels)
    }
    return h(
      'g',
      {
        class: 'container',
        transform: `translate(0,${this.boundary.maxY})`
      },
      bars
    )
  }
}
