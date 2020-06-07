(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global['vue-bars'] = factory());
}(this, (function () { 'use strict';

  function transitionColor (from, to, count) {
    count = count + 1;
    var int = parseInt(from, 16); // 100
    var intTo = parseInt(to, 16); // 50
    var list = []; // 5
    var diff = int - intTo; // 50
    var one = diff / count; // 10

    list.push(from);
    for (var i = 1; i <= count; i++) {
      list.push(Math.floor(int - (one * i)).toString(16));
    }

    return list
  }

  function transition (from, to, count) {
    count = count || 3;
    var r = from.slice(0, 2);
    var g = from.slice(2, 4);
    var b = from.slice(4, 6);
    var rt = to.slice(0, 2);
    var gt = to.slice(2, 4);
    var bt = to.slice(4, 6);
    var allR = transitionColor(r, rt, count);
    var allG = transitionColor(g, gt, count);
    var allB = transitionColor(b, bt, count);
    var list = [];

    allR.forEach(function (_, i) {
      list.push('' + allR[i] + allG[i] + allB[i]);
    });

    return list
  }

  function generateGradientStepsCss (from, to, count) {
    from = from.replace('#', '');
    to = to.replace('#', '');
    var values = transition(from, to, count);
    var total = 100 / (count + 1);
    var obj = [];
    for (var i = 0; i <= count + 1; i++) {
      obj.push({ percentage: Math.floor(total * i), value: values[i] });
    }
    return obj.map(function (value) {
      return '#' + value.value
    })
  }

  /**
   *  Calculate the coordinate
   * @param {number[]|object[]} inArr
   * @param {object} boundary
   * @param {object} props
   * @param {boolean} hasLabels
   * @return {object[]}
   */
  function genPoints (inArr, ref, ref$1, hasLabels) {
    var minX = ref.minX;
    var minY = ref.minY;
    var maxX = ref.maxX;
    var maxY = ref.maxY;
    var minBarHeight = ref.minBarHeight;
    var max = ref$1.max;
    var min = ref$1.min;

    var arr = inArr.map(function (item) { return (typeof item === 'number' ? item : item.value); });
    var minValue = Math.min.apply(Math, arr.concat( [min] ));
    var maxValue = Math.max.apply(Math, arr.concat( [max] ));
    var absMaxVal = Math.abs(maxValue);
    var absMinVal = Math.abs(minValue);
    var gridX = (maxX - minX) / (arr.length - 1);
    var labelHeight = hasLabels ? 20 : 0;

    var delta = 0;
    if (minValue < 0 && maxValue < 0) {
      delta = absMinVal;
    } else if (minValue < 0 && maxValue >= 0) {
      delta = absMinVal + absMaxVal;
    } else if (minValue >= 0 && maxValue >= 0) {
      delta = maxValue;
    }

    var heightMultiplier = delta !== 0 ? (maxY - minY - labelHeight) / delta : 1;
    var yAdjust = minValue * heightMultiplier < minBarHeight ? minBarHeight : 0;
    var zeroLine = minValue < 0 ? absMinVal : 0;

    return arr.map(function (value, index) {
      var title = typeof inArr[index] === 'number' ? inArr[index] : inArr[index].title;
      var height = Math.abs(value);
      var barHeight = (height * heightMultiplier - yAdjust > minBarHeight ? height * heightMultiplier - yAdjust : minBarHeight);
      return {
        x: index * gridX + minX,
        y: maxY - barHeight - (value >= 0 || value === 0 && minValue >= 0 ? zeroLine * heightMultiplier : zeroLine * heightMultiplier - barHeight) - labelHeight - yAdjust,
        height: barHeight,
        title: title
      }
    })
  }

  function genBars (_this, arr, h) {
    var ref = _this.boundary;
    var maxX = ref.maxX;
    var maxY = ref.maxY;
    var labelRotate = ref.labelRotate;
    var labelColor = ref.labelColor;
    var labelSize = ref.labelSize;
    var totalWidth = (maxX) / (arr.length - 1);
    if (!_this.barWidth) {
      _this.barWidth = totalWidth - (_this.padding || 5);
    }
    if (!_this.rounding) {
      _this.rounding = 2;
    }

    var gradients = 0;
    if (_this.gradient && _this.gradient.length > 1) {
      gradients = generateGradientStepsCss(_this.gradient[0], _this.gradient[1], (arr.length - 1));
    }
    var offsetX = (totalWidth - _this.barWidth) / 2;

    var rects = arr.map(function (item, index) {
      return h('rect', {
        attrs: {
          id: ("bar-id-" + index),
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
            dur: ((_this.growDuration) + "s"),
            fill: 'freeze'
          }
        }),
        h('title', {}, [item.title])
      ])
    });
    return rects
  }

  function genLabels (_this, arr, labels, h) {
    var ref = _this.labelProps;
    var maxX = ref.maxX;
    var maxY = ref.maxY;
    var labelRotate = ref.labelRotate;
    var labelSize = ref.labelSize;
    var labelColor = ref.labelColor;
    var totalWidth = (maxX) / (arr.length - 1);
    if (!_this.barWidth) {
      _this.barWidth = totalWidth - (_this.padding || 5);
    }
    if (!_this.rounding) {
      _this.rounding = 2;
    }

    var offsetX = (totalWidth - _this.barWidth) / 2;
    var translateOffsetX = labelRotate >= 0 ? 10 : -10;
    var xaxis = h(
      'g',
      {
        attrs: {
          class: 'x-axis',
          transform: ("translate(" + translateOffsetX + "," + (maxY - 8) + ")")
        }
      },
      arr.map(function (item, index) {
        var labelOffsetX = labelRotate < 0 ? item.x + offsetX : item.x - offsetX;
        var title = labels[index];
        return h(
          'g',
          {
            attrs: {
              class: 'v-bars--tick',
              transform: ("translate(" + labelOffsetX + ",0) rotate(" + labelRotate + ")")
            }
          },
          [
            h(
              'text',
              {
                attrs: {
                  class: 'v-bars--label-text',
                  style: ("text-anchor:middle; fill:" + labelColor + "; font-size:" + labelSize + "em;"),
                  title: title
                }
              },
              [
                title
              ]
            )
          ]
        )
      })
    );
    return xaxis
  }

  var Path = {
    props: ['data', 'boundary', 'barWidth', 'rounding', 'id', 'gradient', 'growDuration', 'max', 'min', 'labelData', 'labelProps'],

    render: function render (h) {
      var ref = this;
      var data = ref.data;
      var boundary = ref.boundary;
      var max = ref.max;
      var min = ref.min;
      var labelData = ref.labelData;
      var points = genPoints(data, boundary, { max: max, min: min }, labelData.length);
      var labels = genLabels(this, points, labelData, h);
      var bars = genBars(this, points, h);

      if (labels.children.length) {
        bars = bars.concat(labels);
      }
      return h(
        'g',
        {
          class: 'container',
          transform: ("translate(0," + (this.boundary.maxY) + ")")
        },
        bars
      )
    }
  };

  var Bars = {
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
        default: function () { return ['#000']; }
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
        default: function () { return []; }
      },
      labelRotate: {
        type: Number,
        default: -45
      },
      labelColor: {
        type: String,
        default: '#999'
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

    render: function render (h) {
      if (!this.data || this.data.length < 2) { return }
      var ref = this;
      var width = ref.width;
      var height = ref.height;
      var padding = ref.padding;
      var viewWidth = width || 300;
      var viewHeight = height || 75;
      var boundary = {
        minX: padding,
        minY: padding,
        maxX: viewWidth - padding,
        maxY: viewHeight - padding,
        minBarHeight: this.minBarHeight
      };
      var labelProps = {
        minX: padding,
        minY: padding,
        maxX: viewWidth - padding,
        maxY: viewHeight - padding,
        labelData: this.labelData,
        labelRotate: this.labelRotate,
        labelColor: this.labelColor,
        labelSize: this.labelSize
      };
      var props = this.$props;

      props.boundary = boundary;
      props.id = 'vue-bars-' + this._uid;
      props.labelProps = labelProps;

      return h('svg', {
        attrs: {
          width: width || '100%',
          height: height || '25%',
          viewBox: ("0 0 " + viewWidth + " " + viewHeight)
        }
      }, [
        h(Path, {
          props: props,
          ref: 'path'
        })
      ])
    }
  };

  Bars.install = function (Vue) {
    Vue.component(Bars.name, Bars);
  };

  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Bars);
  }

  return Bars;

})));
