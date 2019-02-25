<template>
  <div class="widget widget-menu" v-if="results.length > 0">
    <div class="widget-title">Menu</div>
    <div class="widget-body">
      <Menu :items="results" :container="'dor'" />
    </div>
  </div>
</template>

<script type="text/javascript">

import Menu from '@/components/Menu'

export default {
  components: {
    Menu
  },
  props: {
    results: {
      type: Array
    }
  },
  methods: {
    async handleClick (url) {
      if (url.search(/https?:\/\//) !== -1) {
        window.location.href = url
      } else {
        this.$router.push(url)
      }
    }
  }
}

</script>
