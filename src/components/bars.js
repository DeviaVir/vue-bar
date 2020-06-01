import Path from './path'

export default {
  name: 'Bars',

  props: {
    data: {
      type: Array,
      required: true
    },
    autoDraw: Boolean,
    barWidth: {
      type: Number,
      default: 8
    },
    rounding: {
      type: Number,
      default: 2
    },
    growDuration: {
      type: Number,
      default: 0.5
    },
    gradient: {
      type: Array,
      default: () => ['#000']
    },
    max: {
      type: Number,
      default: -Infinity
    },
    min: {
      type: Number,
      default: Infinity
    },
    minBarHeight: {
      type: Number,
      default: 3
    },
    labelData: {
      type: Array,
      default: () => []
    },
    labelRotate: {
      type: Number,
      default: -45
    },
    labelSize: {
      type: Number,
      default: 0.7
    },
    labelColor: {
      type: String,
      default: '#999999'
    },
    labelSize: {
      type: Number,
      default: 0.7
    },
    height: Number,
    width: Number,
    padding: {
      type: Number,
      default: 8
    }
  },

  render (h) {
    if (!this.data || this.data.length < 2) return
    const { width, height, padding } = this
    const viewWidth = width || 300
    const viewHeight = height || 75
    const boundary = {
      minX: padding,
      minY: padding,
      maxX: viewWidth - padding,
      maxY: viewHeight - padding,
      minBarHeight: this.minBarHeight
    }
    const labelProps = {
      minX: padding,
      minY: padding,
      maxX: viewWidth - padding,
      maxY: viewHeight - padding,
      labelData: this.labelData,
      labelRotate: this.labelRotate,
      labelColor: this.labelColor,
      labelSize: this.labelSize
    }
    const props = this.$props

    props.boundary = boundary
    props.id = 'vue-bars-' + this._uid
    props.labelProps = labelProps

    return h('svg', {
      attrs: {
        width: width || '100%',
        height: height || '25%',
        viewBox: `0 0 ${viewWidth} ${viewHeight}`
      }
    }, [
      h(Path, {
        props,
        ref: 'path'
      })
    ])
  }
}
