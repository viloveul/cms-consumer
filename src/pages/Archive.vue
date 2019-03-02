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
          <div class="tags-links" v-if="post.relationships.tags.length > 0">
            <router-link v-for="tag in post.relationships.tags" :key="tag.id" :to="getTagLink(tag)">
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
  name: 'Archive',
  components: {
    Layout
  },
  async mounted () {
    let res = await this.$store.dispatch('fetchArchivePosts', {
      name: this.$route.params.slug
    })
    this.posts = res.data
    this.$store.commit('setTitle', 'Archive - ' + res.meta.archive.title)
  },
  methods: {
    ...helpers
  },
  data () {
    return {
      posts: []
    }
  }
}

</script>
