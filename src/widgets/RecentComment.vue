<template>
  <div class="widget widget-comment" v-if="results.length > 0">
    <div class="widget-title">Recent Comments</div>
    <div class="widget-body">
      <ul>
        <li v-for="(item, index) in results" :key="'widget-comment-' + index">
          {{ item.name }} on
          <router-link :to="'/' + item.post.slug">
            "{{ item.post.title }}"
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
