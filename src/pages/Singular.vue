<template>
  <Layout :sidebar="isFormatPost(post) === true" :class="'main'">
    <template slot="content">
      <div class="content-wrapper">
        <header class="entry-header">
          <h2 class="entry-title">{{ post.title }}</h2>
          <div class="posted">
            Posted
            <span class="by" v-if="author.id !== undefined && isFormatPost(post) === true">
              by
              <router-link :to="getAuthorLink(author)">
                {{ author.name }}
              </router-link>
            </span>
            at <span class="at">{{ getPostFormatedDate(post) }}</span>
          </div>
          <div class="tags-links" v-if="tags && isFormatPost(post) === true">
            <router-link v-for="tag in getPostTags(tags, 'tag')" :key="tag.id" :to="getTagLink(tag)">
              {{ tag.title }}
            </router-link>
          </div><!-- .tags-links -->
        </header><!-- .entry-header -->
        <div class="entry-content" v-html="post.content"></div>
      </div><!-- .content-wrapper -->

      <CommentList
        v-if="post.comment_enabled && isFormatPost(post) === true"
        v-on:paginate="handlePaginate"
        :key="'comments-' + keyList"
        :post_id="post.id"
        :page="page"
        :class="'comment-list'"
      >
      </CommentList>

      <CommentForm
        v-if="post.comment_enabled && isFormatPost(post) === true"
        v-on:sent="reloadComments"
        :post_id="post.id"
        :class="'comment-form'"
      >
      </CommentForm>

    </template>
  </Layout>
</template>

<script type="text/javascript">

import helpers from '@/services/helpers'
import Layout from '@/components/Layout'
import CommentForm from '@/components/CommentForm'
import CommentList from '@/components/CommentList'

export default {
  name: 'Singular',
  components: {
    Layout,
    CommentForm,
    CommentList
  },
  computed: {
    page () {
      return parseInt(this.$route.query.page === undefined ? 1 : this.$route.query.page)
    }
  },
  methods: {
    ...helpers,
    async reloadComments () {
      this.keyList = Math.random()
    },
    async handlePaginate (n) {
      await this.$router.push({
        path: this.$route.path,
        query: Object.assign({}, {...this.$route.query}, {page: n})
      })
    }
  },
  async mounted () {
    let res = await this.$store.dispatch('fetchPostDetail', {
      slug: this.$route.path.split('/').pop()
    })
    this.post = res.data
    this.author = res.data.author || {}
    this.tags = res.data.tags || []
    this.$store.dispatch('updateTitle', this.post.title)
    this.$store.dispatch('updateDescription', this.post.description)
    if (this.getPermalink(this.post) !== this.$route.path) {
      await this.$router.replace(this.getPermalink(this.post))
    }
  },
  data () {
    return {
      post: {},
      author: {},
      tags: [],
      keyList: null
    }
  }
}

</script>
