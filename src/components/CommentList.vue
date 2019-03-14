<template>
  <div>
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
    <Paginate
      v-show="pages > 1"
      :page-count="pages"
      :click-handler="handleClick"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :force-page="page"
      :container-class="'pagination'"
    >
    </Paginate>
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
    page: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 10
    },
    order: {
      type: String,
      default: 'id'
    },
    sort: {
      type: String,
      default: 'asc'
    }
  },
  async mounted () {
    let res = await this.$store.dispatch('fetchPostComments', {
      id: this.post_id,
      params: {
        page: this.page,
        size: this.size,
        order: this.order,
        sort: this.sort
      }
    })

    this.comments = res.data.map(comment => {
      return comment.attributes
    })
    this.pages = Math.ceil(res.meta.total / res.meta.size) || 1
  },
  methods: {
    async handleClick (n) {
      await this.$emit('paginate', n)
    }
  },
  data () {
    return {
      show: false,
      pages: 1,
      comments: []
    }
  }
}

</script>
