<template>
  <div class="widget widget-recent-post" v-if="results.length > 0">
    <div class="widget-title">Recent Posts</div>
    <div class="widget-body">
      <ul>
        <li v-for="(item, index) in results" :key="'widget-recent-post-' + index">
          <router-link :to="getPermalink(item)">
            {{ item.title }}
          </router-link>
        </li>
      </ul>
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
  methods: {
    ...helpers
  }
}

</script>
