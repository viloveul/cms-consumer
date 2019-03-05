<template>
  <div class="viloveul-wrapper">
    <div id="viloveul-container">
      <div id="viloveul" v-on:click="handleClick()" :title="title">
        <p class="viloveul-body">
          <span class="text text-1">V</span>
          <span class="text text-2">i</span>
          <span class="text text-3">l</span>
          <span class="text text-4">o</span>
          <span class="text text-5">v</span>
          <span class="text text-6">e</span>
          <span class="text text-7">u</span>
          <span class="text text-8">l</span>
        </p>
      </div>
    </div>
    <div id="markdown-container">
      <div class="content-body-framework" v-html="content"></div>
    </div>
  </div>
</template>

<script type="text/javascript">

import axios from 'axios'

export default {
  name: 'Viloveul',
  async mounted () {
    await this.$store.dispatch('updateTitle', null)
    await this.$store.commit('setContainerClasses', 'viloveul-container-class')
    await this.$store.commit('setShowNavbar', false)
    await axios.get('https://api.github.com/repos/zafex/viloveul-framework/readme', {
      headers: {
        'Accept': 'application/vnd.github.VERSION.html'
      }
    }).then(res => {
      this.content = res.data
    })
    await axios.get('https://api.github.com/users/viloveul/repos', {
      headers: {
        'Accept': 'application/vnd.github.VERSION.html'
      }
    }).then(res => {
      this.repos = res.data
    })
  },
  methods: {
    handleClick () {
      window.open(this.url)
    }
  },
  data () {
    return {
      title: 'Viloveul',
      url: 'https://www.github.com/viloveul',
      content: '<div class="content-body-framework"><div class="instapaper_body md" data-path="README.md" id="readme"><article class="markdown-body entry-content" itemprop="text"><h1><a aria-hidden="true" class="anchor" href="#viloveul-framework" id="user-content-viloveul-framework"><svg aria-hidden="true" class="octicon octicon-link" height="16" version="1.1" viewbox="0 0 16 16" width="16"><path d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z" fill-rule="evenodd"></path></svg></a>Viloveul Framework</h1><p>require PHP 7</p><div class="highlight highlight-source-batchfile"><pre>composer create-project viloveul/framework your-project-name</pre></div><p>all of viloveul component inside<a href="https://github.com/viloveul">https://github.com/viloveul</a></p></article></div></div>',
      repos: []
    }
  }
}
</script>
