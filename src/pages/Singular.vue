<template>
  <Layout :sidebar="isFormatPost(post) === true">
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

      <CommentForm v-if="post.comment_enabled && isFormatPost(post) === true" :post_id="parseInt(post.id)" :name="me.name" :email="me.email" v-on:sent="reloadComments" />
      <CommentList :key="'comments-' + keyList" v-if="post.comment_enabled && isFormatPost(post) === true" :post_id="parseInt(post.id)" />
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
    me () {
      return this.$store.getters.getMe()
    }
  },
  methods: {
    ...helpers,
    async reloadComments () {
      this.keyList = Math.random()
    }
  },
  async mounted () {
    let res = await this.$store.dispatch('fetchPostDetail', {
      slug: this.$route.path.split('/').pop()
    })
    this.post = res.data.attributes
    this.author = res.data.relationships.author.data || {}
    this.tags = res.data.relationships.tags.data || []
    this.$store.commit('setTitle', this.post.title)
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
