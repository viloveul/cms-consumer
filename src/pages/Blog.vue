<template>
  <Layout :class="'main'">
    <template slot="content">
      <div class="content-wrapper" v-for="post in posts" :key="post.id">
        <header class="entry-header">
          <h2 class="entry-title">{{ post.attributes.title }}</h2>
          <div class="posted">
            Posted
            <span class="by" v-if="post.relationships.author !== undefined">
              by
              <router-link :to="getAuthorLink(post.relationships.author.data)">
                {{ post.relationships.author.data.name }}
              </router-link>
            </span>
            at <span class="at">{{ getPostFormatedDate(post.attributes) }}</span>
          </div>
          <div class="tags-links" v-if="post.relationships.tags">
            <router-link v-for="tag in post.relationships.tags.data" :key="tag.id" :to="getTagLink(tag)">
              {{ tag.title }}
            </router-link>
          </div><!-- .tags-links -->
        </header><!-- .entry-header -->

        <div class="entry-content">{{ post.attributes.description }}</div>

        <footer class="entry-footer">
          <router-link :to="getPermalink(post.attributes)">
            Read more...
          </router-link>
          <div class="comments-count" v-if="post.attributes.comment_enabled && isFormatPost(post.attributes) === true">
            {{ post.attributes.comments_count }} Comments
          </div>
        </footer><!-- .entry-footer -->
      </div><!-- .content-wrapper -->
    </template>
  </Layout>
</template>

<script type="text/javascript">

import helpers from '@/services/helpers'
import Layout from '@/components/Layout'

export default {
  name: 'Blog',
  components: {
    Layout
  },
  async mounted () {
    if (this.$route.params.day !== undefined) {
      this.filters.search_created_at = this.$route.params.year + '-' + this.$route.params.month + '-' + this.$route.params.day
    } else if (this.$route.params.month !== undefined) {
      this.filters.search_created_at = this.$route.params.year + '-' + this.$route.params.month + '-'
    } else if (this.$route.params.year !== undefined) {
      this.filters.search_created_at = this.$route.params.year + '-'
    }

    if (this.$route.query.search !== undefined) {
      this.filters.search_content = this.$route.query.search
    }
    this.$store.commit('setTitle', 'Blog')
    let res = await this.$store.dispatch('fetchBlogPosts', {
      params: this.filters
    })
    this.posts = res.data
  },
  methods: {
    ...helpers
  },
  data () {
    return {
      posts: [],
      filters: {}
    }
  }
}

</script>
