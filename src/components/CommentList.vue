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
  </div>
</template>

<script type="text/javascript">

export default {
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
    let res = await this.$store.dispatch('fetchPostComments', {
      id: this.post_id
    })
    this.comments = res.data.map(comment => {
      return comment.attributes
    })
  },
  data () {
    return {
      comments: []
    }
  }
}

</script>
