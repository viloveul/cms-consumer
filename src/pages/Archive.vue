<template>
  <div class="main">
    <div class="content-wrapper" v-for="post in posts" :key="post.id">
      <header class="entry-header">
        <h2 class="entry-title">{{ post.attributes.title }}</h2>
        <div class="posted-by" v-if="post.relationships.author !== undefined">
          Posted by
          <router-link :to="getAuthorLink(post.relationships.author.data)">
            {{ post.relationships.author.data.name }}
          </router-link>
        </div>
        <div class="posted-date">{{ post.attributes.created_at }}</div>
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
        <div class="comments-count" v-if="post.attributes.comment_enabled && $store.getters.isFormatPost(post.attributes) === true">
          {{ post.attributes.comments_count }} Comments
        </div>
      </footer><!-- .entry-footer -->
    </div><!-- .content-wrapper -->
  </div>
</template>

<script type="text/javascript">

import helpers from '@/services/helpers'

export default {
  name: 'Archive',
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
