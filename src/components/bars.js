import Path from './path'

export default {
  name: 'Bars',

  props: {
    data: {
      type: Array,
      required: true
    },
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
    gradient: Array,
    height: Number,
    width: Number,
    padding: {
      type: Number,
      default: 8
    }
  },

  watch: {
    data: {
      immediate: true,
      handler (val) {
        if (!val || val.length < 2) return
      }
    }
  },

  render (h) {
    if (!this.data || this.data.length < 2) return
    const { width, height, padding, barWidth, rounding, gradient, growDuration } = this
    const viewWidth = width || 300
    const viewHeight = height || 75
    const boundary = {
      minX: padding, minY: padding,
      maxX: viewWidth - padding, maxY: viewHeight - padding
    }
    const props = this.$props

    props.boundary = boundary
    props.id = 'vue-bars-' + this._uid
    this.pathId = props.id + '-path'

    return h('svg', {
      attrs: {
        width: width || '100%',
        height: height || '25%',
        viewBox: `0 0 ${viewWidth} ${viewHeight}`
      }
    }, [
      h(Path, {
        props,
        attrs: { id: this.pathId },
        ref: 'path'
      })
    ])
  }
}
