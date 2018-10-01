<template>
  <main class="main">
    <github-badge slug="deviavir/vue-bars" />

    <h1>Vue Bars</h1>
    <p> Simple, elegant spark bars for Vue.js</p>
    <bars
      :data="data"
      :gradient="gradient"
      :barWidth="5"
      :growDuration="1">
    </bars>

    <pre class="code-wrap"><code class="code" v-html="code"></code></pre>

    <footer>Released under the <a href="//github.com/deviavir/vue-bars/blob/master/LICENSE">MIT</a> license. <a href="//github.com/deviavir/vue-bars">View source.</a></footer>
  </main>
</template>

<script>
  import Bars from '../src/index.js'
  import hanabi from 'hanabi'
  import GithubBadge from 'vue-github-badge'

  export default {
    components: { Bars, GithubBadge },

    created () {
      this.data = [1, 2, 5, 9, 5, 10, 3, 5, 8, 12, 1, 8, 2, 9, 10, 2, 9, 4, 5, 6, 7, 3, 2, 3, 5]
      this.gradient = ['#ffbe88', '#ff93df']
      this.code = hanabi(`<bars
  :data="[1, 2, 5, 9, 5, 10, 3, 5, 8, 12, 1, 8, 2, 9, 10, 2, 9, 4, 5, 6, 7, 3, 2, 3, 5]"
  :gradient="['#ffbe88', '#ff93df']"
  :barWidth="5"
  :growDuration="1">
</bars>`)
    },
  }
</script>

<style>
  h1 {
    margin: 0;
    font-size: 3rem;
    font-weight: normal;
  }

  .main {
    max-width: 650px;
    margin: 15vh auto 20px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    font-size: 14px;
  }

  .code-wrap {
    text-align: left;
    background-color: #f8f8f8;
    padding: 1.2em 1.4em;
    line-height: 1.5em;
    margin: 60px 0 0;
    overflow: auto;
  }

  .code {
    margin: 0;
    padding: 0;
  }

  footer {
    margin-top: 40px;
    line-height: 2;
  }

  a {
    color: #42b983;
  }
</style>
