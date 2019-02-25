<template>
  <div class="widget widget-archive" v-if="results.length > 0">
    <div class="widget-title">Archive</div>
    <div class="widget-body">
      <ul>
        <li v-for="(item, index) in results" :key="'widget-archive-' + index">
          <router-link :to="'/' + item.type + '/' + item.slug">
            {{ item.title }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/javascript">

export default {
  props: {
    results: {
      type: Array
    }
  }
}

</script>
