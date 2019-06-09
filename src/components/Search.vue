<template>
  <div>
    <form v-on:submit.prevent="handleSearch">
      <div class="search-form">
        <input type="text" class="form-control" v-model="search" placeholder="Put Keyword..">
      </div>
      <div class="search-button">
        <button type="submit" class="btn btn-info">Search</button>
      </div>
    </form>
  </div>
</template>

<script type="text/javascript">

import helpers from '@/services/helpers'

export default {
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
          path: '/',
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
