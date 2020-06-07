<div align="center">
  <img src="https://raw.githubusercontent.com/deviavir/vue-bar/master/media/logo.png" width="500" alt="Vue Bars">
  <br>
  <h1>Vue Bars</h1>
  <p>🌈 Simple, elegant spark bars for Vue.js</p>
  <br>
  <a href="https://www.npmjs.org/package/vuebars"><img src="https://img.shields.io/npm/v/vuebars.svg?style=flat-square" alt="npm"></a>
  <img src="https://img.shields.io/badge/vue-^2.2-4fc08d.svg?colorA=2c3e50&style=flat-square" alt="vue">
</div>

<br>

## Installation

```shell
npm i vuebars -S
```

## Usage

```js
import Vue from 'vue'
import Bars from 'vuebars'

Vue.use(Bars)
```

[Live Demo](https://jsfiddle.net/h1o5z4xe/)

*vue template*

```vue
<bars
  :data="[1, 2, 5, 9, 5, 10, 3, 5, 2, 5, 1, 8, 2, 9, 0]"
  :gradient="['#6fa8dc', '#42b983']">
</bars>
```

## Inspired by

[vuetrend](https://www.npmjs.org/package/vuetrend) - 📈 Simple, elegant spark lines


## Props

| Name              | Type           | Default     | Description                                                                                                                                                                                                                                       | Example                                                                      |
| ----------------- | -------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| data              | Number\|Object | `undefined` | The data accepted by Vue Bars is incredibly simple: An array of y-axis values to graph.                                                                                                                                                           | `[120, 149, 193.4, 200, 92]` or `[{ value: 4 }, { value: 6 }, { value: 8 }]` |
| gradient          | String         | `['#000']`  | Colour can be specified as any SVG-supported format (named, rgb, hex, etc).                                                                                                                                                                       | `['#0FF', '#F0F', '#FF0']`                                                   |
| width             | Number         | auto        | Set an explicit width for your SVG.                                                                                                                                                                                                               | -                                                                            |
| height            | Number         | auto        | Set an explicit height for your SVG.                                                                                                                                                                                                              | -                                                                            |
| padding           | Number         | `8`         | If you set a very large `strokeWidth` on your line, you may notice that it gets "cropped" towards the edges.                                                                                                                                      | -                                                                            |
| rounding          | Number         | `2`         | To control radius on each bar's corners                                                                                                                                                                                                           | -                                                                            |
| barWidth          | Number         | `4`         | Set width of each bar                                                                                                                                                                                                                             | -                                                                            |
| labelRotate       | Number         | `-45`       | To control rotation of labels                                                                                                                                                                                                                     | -                                                                            |
| labelSize         | Number         | `0.7`       | To control size of labels                                                                                                                                                                                                                         | -                                                                            |
| labelColor        | String         | `#999`      | To control color of labels                                                                                                                                                                                                                        | -                                                                            |
| labelData         | String         | `[]`        | Array of strings                                                                                                                                                                                                                                  | `['label1','label2','label3']`                                               |
| minBarHeight      | Number         | `3`         | Minimum height                                                                                                                                                                                                                                    | -                                                                            |
| autoDraw          | Boolean        | `false`     | Allow the line to draw itself on mount. Set to `true` to enable, and customize using `autoDrawDuration` and `autoDrawEasing`.                                                                                                                     | -                                                                            |
| growDuration      | Number         | `0.5`       | The amount of time, in seconds, that the autoDraw animation should span. This prop has no effect if `autoDraw` isn't set to `true`.                                                                                                               | -                                                                            |
| max               | Number         | `-Infinity` | Specify max value                                                                                                                                                                                                                                 | -                                                                            |
| min               | Number         | `Infinity`  | Specify min value, This is useful if you have multiple lines. See [#8](https://github.com/QingWei-Li/vue-trend/issues/8)                                                                                                                          | -                                                                            |


#### SVG Props

By default, all properties not recognized by Vue Bars will be delegated to the SVG. The line inherits these properties if none of its own override them.


## On-the-fly reloading

Make sure you use pass the same variable for your `data` as for the `key`, this will make sure Vue recognizes changes to your data array,
and consequently forces a reload of the instance.

## TODO
- Unit test


## License
MIT
