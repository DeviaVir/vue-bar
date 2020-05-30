<template>
  <main class="main">
    <github-badge slug="deviavir/vue-bars" />

    <h1>Vue Bars</h1>
    <p class="headline">Simple, elegant spark bars for Vue.js</p>
    <bars
      :key="data"
      :data="getData()"
      :gradient="[color1, color2]"
      :barWidth="barWidth"
      :rounding="radius"
      :padding="padding"
      :labelColor="labelColor"
      :labelRotate="labelRotate"
      :labelSize="labelSize"
      :growDuration="1">
    </bars>

    <div>
      <vue-tabs>
        <v-tab title="Configure">

          <div class="settings-container">
            <div class="settings-column">
              <div>
                <div class="setting-label">Width</div>
                <vue-slider v-model="barWidth" :min="1" :max="12" :interval="0.1"></vue-slider>
              </div>

              <div>
                <div class="setting-label">Rounding</div>
                <vue-slider v-model="radius" :min="0.1" :max="6" :interval="0.1"></vue-slider>
              </div>

              <div>
                <div class="setting-label">Padding</div>
                <vue-slider v-model="padding" :min="0" :max="10" :interval="0.1"></vue-slider>
              </div>

              <div>
                <div class="setting-label">Gradient first color</div>
                <v-swatches v-model="color1" :swatch-size="18" background-color="#f7f7f7" :swatches="['#b8f2e6', '#00f5d4', '#35a7ff', '#3a86ff', '#001233','#000000', '#ffe74c', '#ffbe88','#ff93df', '#f94144','#d6d6d6']" inline></v-swatches>
              </div>

              <div>
                <div class="setting-label">Gradient second color</div>
                <v-swatches v-model="color2" :swatch-size="18" background-color="#f7f7f7" :swatches="['#b8f2e6', '#00f5d4', '#35a7ff', '#3a86ff', '#001233','#000000', '#ffe74c', '#ffbe88','#ff93df', '#f94144','#d6d6d6']" inline></v-swatches>
              </div>
            </div>

            <div class="settings-column">

              <label class="control">
                <input type="checkbox" class="control__input visually-hidden" v-model="showLabels">
                <span class="control__indicator"></span>
                <span class="checkbox-label">Show labels ?</span>
              </label>

              <div>
                <div class="setting-label">Label color</div>
                <v-swatches v-model="labelColor" :swatch-size="18" background-color="#f7f7f7" :swatches="['#b8f2e6', '#00f5d4', '#35a7ff', '#3a86ff', '#001233','#000000', '#ffe74c', '#ffbe88','#ff93df', '#f94144','#d6d6d6']" inline></v-swatches>
              </div>

              <div>
                <div class="setting-label">Label rotate</div>
                <vue-slider v-model="labelRotate" :min="45" :max="90" :interval="0.1"></vue-slider>
              </div>

              <div>
                <div class="setting-label">Label size</div>
                <vue-slider v-model="labelSize" :min="0.2" :max="1.5" :interval="0.1"></vue-slider>
              </div>
            </div>
          </div>

        </v-tab>
        <v-tab title="Code">
          <pre class="code-wrap"><code class="code" v-html="code"></code></pre>
        </v-tab>
      </vue-tabs>
    </div>

    <footer>Released under the <a href="//github.com/deviavir/vue-bars/blob/master/LICENSE">MIT</a> license. <a href="//github.com/deviavir/vue-bars">View source</a>.</footer>
  </main>
</template>

<script>
  import Bars from '../src/index.js'
  import hanabi from 'hanabi'
  import GithubBadge from 'vue-github-badge'
  import VueSlider from 'vue-slider-component'
  import 'vue-slider-component/theme/default.css'
  import VSwatches from 'vue-swatches'
  import 'vue-swatches/dist/vue-swatches.css'
  import {VueTabs, VTab} from 'vue-nav-tabs'
  import 'vue-nav-tabs/themes/vue-tabs.css'

  export default {
    components: { Bars, GithubBadge, VueSlider, VSwatches, VueTabs, VTab },

    data: function () {
      return {
        barWidth: 4,
        radius: 2,
        padding: 8,
        color1: '#ffbe88',
        color2: '#ff93df',
        showLabels: false,
        labelColor: '#d6d6d6',
        labelRotate: 45,
        labelSize: 0.5
      }
    },

    methods: {
      getData: function () {
        return this.showLabels ? this.data : this.data.map(item => item.value);
      }
    },

    computed: {
      code: function(){
        return hanabi(`<bars
  :key="reference-to-your-var"
  :data="${ this.showLabels ? '[{value: 1, title: \'#1\'}, {value: 2, title: \'#2\'}, ... ]' : '[1, 2, ... ]' }"
  :gradient="['${ this.color1 }', '${ this.color2 }']"
  :barWidth="${ this.barWidth }"
  :rounding="${ this.radius }"${ this.showLabels ? '\n  :labelColor="' + this.labelColor + '"\n' : ''}  ${ this.showLabels ? ':labelRotate="' + this.labelRotate + '"\n' : ''}  ${ this.showLabels ? ':labelSize="' + this.labelSize + '"' : ''}
  :growDuration="1">
</bars>`);
      }
    },

    created () {
      this.data = [{value: 1, title: '#1'}, {value: 2, title: '#2'}, {value: 5, title: '#3'}, {value: 9, title: '#4'}, {value: 5, title: '#5'}, {value: 10, title: '#6'}, {value: 3, title: '#7'}, {value: 5, title: '#8'}, {value: 8, title: '#9'}, {value: 12, title: '#10'}, {value: 1, title: '#11'}, {value: 8, title: '#12'}, {value: 2, title: '#13'}, {value: 9, title: '#14'}, {value: 10, title: '#15'}, {value: 2, title: '#16'}, {value: 9, title: '#17'}, {value: 4, title: '#18'}, {value: 5, title: '#19'}, {value: 6, title: '#20'}, {value: 7, title: '#21'}, {value: 3, title: '#22'}, {value: 2, title: '#23'}, {value: 3, title: '#24'}, {value: 5, title: '#25'}]
    },
  }
</script>

<style>
  h1 {
    margin: 0;
    font-size: 3rem;
    font-weight: bold;
  }

  .headline {
    font-family: Courier,Courier New,monospace;
    font-size: 15px;
    font-weight: 400;
    padding: 20px 0;
  }

  .main {
    max-width: 650px;
    margin: 5vh auto 20px;
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    font-size: 18px;
  }

  .code-wrap {
    text-align: left;
    background-color: #f8f8f8;
    padding: 2em 1.4em;
    line-height: 1.5em;
    margin: 0;
    overflow: auto;
    font-size: 1rem;
  }

  .code {
    margin: 0;
    padding: 0;
  }

  footer {
    margin-top: 40px;
    line-height: 2;
    font-size: 0.8rem;
    color: #c1c1c1;
    font-family: Courier,Courier New,monospace;
  }

  a {
    color: #39fda4;
  }

  .setting-label {
    text-align: left;
    font-size: 1rem;
    font-weight: 700;
    padding-top: 1rem;
  }

  .settings-container {
    display: flex;
  }

  @media only screen and (max-width: 480px) {
    .settings-container {
      display:block
    }
  }

  .tab-content {
    background: #f7f7f7;
  }

  .settings-column {
    flex: auto;
    margin: 2rem 2rem 0;
    padding-bottom: 2rem;
  }

  .vue-swatches {
    display: flex;
  }

  .vue-swatches__wrapper {
    padding-left: 0 !important;
  }

  .vue-swatches__container {
    padding: 5px 0 0 !important;
    margin-bottom: 0 !important;
  }

  .control {
    display: flex;
    align-items: center;
    padding-top: 14px;
  }
  .control__indicator {
    margin-right: .25rem;
    width: 1rem;
    height: 1rem;
    background-color: #ccc;
    border-radius: 3px;
  }
  .control__input:focus ~ .control__indicator {
    box-shadow: 0 0 0 0.2rem rgba(38,143,255,.5);
  }
  .control__input:checked ~ .control__indicator {
    background-color: #3498db;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0Ij48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTkgMTYuMkw0LjggMTJsLTEuNCAxLjRMOSAxOSAyMSA3bC0xLjQtMS40TDkgMTYuMnoiLz48L3N2Zz4=');
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
  }
  /* Visually hide the browser input to ensure it is still focusable via keyboards */
  .visually-hidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  .checkbox-label {
    font-size: 1rem;
    padding-left: 5px;
    margin-top: 3px;
  }

  .vue-tabs .nav>li span.title {
    font-weight: 700;
  }

</style>
