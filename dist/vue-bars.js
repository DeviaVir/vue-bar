(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global['vue-bars'] = factory());
}(this, (function () { 'use strict';

function transitionColor(from, to, count) {
  count = count + 1;
  var int = parseInt(from, 16); // 100
  var intTo = parseInt(to, 16); // 50
  var list = []; // 5
  var diff = int - intTo; // 50
  var isNegative = diff < 0; // false
  var one = diff / count; // 10
 
  list.push(from);
  for (var i = 1; i <= count; i++) {
    list.push(Math.floor(int - (one * i)).toString(16));
  }
 
  return list
}
 
function transition(from, to, count) {
  count = count || 3;
  var r = from.slice(0, 2), g = from.slice(2, 4), b = from.slice(4, 6);
  var rt = to.slice(0, 2), gt = to.slice(2, 4), bt = to.slice(4, 6);
  var allR = transitionColor(r, rt, count);
  var allG = transitionColor(g, gt, count);
  var allB = transitionColor(b, bt, count);
  var list = [];
 
  allR.forEach(function(_, i) {
    list.push('' + allR[i] + allG[i] + allB[i]);
  });
 
  return list
}
 
function generateGradientStepsCss(from, to, count) {
  from = from.replace('#', '');
  to = to.replace('#', '');
  var values = transition(from, to, count);
  var total = 100 / (count + 1);
  var obj = [];
  for (var i = 0; i <= count + 1; i++) {
    obj.push({percentage: Math.floor(total * i), value: values[i]});
  }
  return obj.map(function(value) {
    return '#' + value.value
  })
}

/**
 *  Calculate the coordinate
 * @param  {number[]|object[]}  arr
 * @param  {object}             boundary
 * @return {object[]}
 */
function genPoints (arr, ref) {
  var minX = ref.minX;
  var minY = ref.minY;
  var maxX = ref.maxX;
  var maxY = ref.maxY;

  var gridX = (maxX - minX) / (arr.length - 1);
  var gridY = (maxY - minY) / (Math.max.apply(Math, arr) - Math.min.apply(Math, arr));

  return arr.map(function (item, index) {
    var value = typeof item === 'number' ? item : item.value;

    return { x: index * gridX + minX, y: maxY - value * gridY, v: value }
  })
}

function genBars (_this, arr, h) {
  var ref = _this.boundary;
  var minX = ref.minX;
  var minY = ref.minY;
  var maxX = ref.maxX;
  var maxY = ref.maxY;
  var totalWidth = (maxX) / (arr.length-1);
  if (!_this.barWidth) {
    _this.barWidth = totalWidth - (_this.padding || 5);
  }
  if (!_this.rounding) {
    _this.rounding = 2;
  }

  var gradients = generateGradientStepsCss(_this.gradient[0], _this.gradient[1], (arr.length-1));
  var offsetX = (totalWidth - _this.barWidth) / 2;

  return arr.map(function (item, index) {
    return h('rect', {
      attrs: {
        id: ("bar-id-" + index),
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
          dur: ((_this.growDuration) + "s"),
          fill: 'freeze'
        }
      }),
      h('title', {}, [item.v])
    ])
  })
}

var Path = {
  props: ['smooth', 'data', 'boundary', 'barWidth', 'rounding', 'id', 'gradient', 'growDuration'],

  render: function render (h) {
    var points = genPoints(this.data, this.boundary);
    var bars = genBars(this, points, h);

    return h('g', {
      attrs: {
        transform: ("scale(1,-1) translate(0,-" + (this.boundary.maxY) + ")")
      }
    }, bars)
  }
};

var Bars$1 = {
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
      handler: function handler (val) {
        if (!val || val.length < 2) { return }
      }
    }
  },

  render: function render (h) {
    if (!this.data || this.data.length < 2) { return }
    var ref = this;
    var width = ref.width;
    var height = ref.height;
    var padding = ref.padding;
    var barWidth = ref.barWidth;
    var rounding = ref.rounding;
    var gradient = ref.gradient;
    var growDuration = ref.growDuration;
    var viewWidth = width || 300;
    var viewHeight = height || 75;
    var boundary = {
      minX: padding, minY: padding,
      maxX: viewWidth - padding, maxY: viewHeight - padding
    };
    var props = this.$props;

    props.boundary = boundary;
    props.id = 'vue-bars-' + this._uid;
    this.pathId = props.id + '-path';

    return h('svg', {
      attrs: {
        width: width || '100%',
        height: height || '25%',
        viewBox: ("0 0 " + viewWidth + " " + viewHeight)
      }
    }, [
      h(Path, {
        props: props,
        attrs: { id: this.pathId },
        ref: 'path'
      })
    ])
  }
};

Bars$1.install = function (Vue) {
  Vue.component(Bars$1.name, Bars$1);
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Bars$1);
}

return Bars$1;

})));
