<template>
  <div class="widget widget-search-form">
    <div class="widget-title">Search Form</div>
    <div class="widget-body">
      <form v-on:submit.prevent="handleSearch">
        <div class="form-group">
          <input type="text" class="form-control" v-model="search">
        </div>
        <button type="submit" class="btn btn-info">Search</button>
      </form>
    </div>
  </div>
</template>

<script type="text/javascript">

import helpers from '@/services/helpers'

export default {
  props: {
    results: {
      type: Array
    }
  },
  mounted () {
    if (this.$route.query.search !== undefined) {
      this.search = this.$route.query.search
    }
  },
  methods: {
    ...helpers,
    handleSearch () {
      if (this.search.length > 0) {
        this.$router.push({
          path: '/blog',
          query: {
            search: this.search
          }
        })
      }
    }
  },
  data () {
    return {
      search: ''
    }
  }
}

</script>
