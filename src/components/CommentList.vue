<template>
  <div :class="className">
    <div class="comment" v-for="comment in comments" :key="comment.id">
      <div class="comment-wrapper">
        <div class="comment-header">
          <h4>{{ comment.name }}</h4>
          <small>{{ comment.created_at }}</small>
        </div>
        <div class="comment-body">
          {{ comment.content }}
        </div>
      </div>
    </div>
    <paginate
      v-if="pages > 1"
      :page-count="pages"
      :click-handler="handleClick"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :force-page="filters.page"
      :container-class="'pagination'">
    </paginate>
  </div>
</template>

<script type="text/javascript">

import Paginate from 'vuejs-paginate'

export default {
  components: {
    Paginate
  },
  props: {
    post_id: {
      type: Number,
      required: true
    },
    className: {
      type: String,
      default: 'comment-list'
    }
  },
  async mounted () {
    if (this.$route.query.page !== undefined) {
      this.filters.page = parseInt(this.$route.query.page)
    }

    let res = await this.$store.dispatch('fetchPostComments', {
      id: this.post_id,
      params: this.filters
    })

    this.pages = Math.ceil(res.meta.total / res.meta.size) || 0
    this.comments = res.data.map(comment => {
      return comment.attributes
    })
  },
  methods: {
    async handleClick (n) {
      let qs = Object.assign({}, {...this.$route.query}, {page: n})
      await this.$router.push({
        path: this.$route.path,
        query: {...qs}
      })
    }
  },
  data () {
    return {
      pages: 1,
      comments: [],
      filters: {
        page: 1,
        order: 'id',
        sort: 'asc'
      }
    }
  }
}

</script>
