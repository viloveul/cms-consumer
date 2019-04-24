<template>
  <Layout :class="'main'">
    <template slot="content">
      <div class="content-wrapper" v-for="post in posts" :key="post.id">
        <header class="entry-header">
          <h2 class="entry-title">{{ post.title }}</h2>
          <div class="posted">
            Posted
            <span class="by" v-if="post.author !== undefined">
              by
              <router-link :to="getAuthorLink(post.author)">
                {{ post.author.name }}
              </router-link>
            </span>
            at <span class="at">{{ getPostFormatedDate(post) }}</span>
          </div>
          <div class="tags-links" v-if="post.tags">
            <router-link v-for="tag in post.tags" :key="tag.id" :to="getTagLink(tag)">
              {{ tag.title }}
            </router-link>
          </div><!-- .tags-links -->
        </header><!-- .entry-header -->

        <div class="entry-content">{{ post.description }}</div>

        <footer class="entry-footer">
          <router-link :to="getPermalink(post)">Read more...</router-link>
          <div class="comments-count" v-if="post.comment_enabled && isFormatPost(post) === true">
            {{ post.count_comments }} Comments
          </div>
        </footer><!-- .entry-footer -->
      </div><!-- .content-wrapper -->
      <Paginate
        v-show="pages > 1"
        :page-count="pages"
        :click-handler="handleClick"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :force-page="filters.page"
        :container-class="'pagination'">
      </Paginate>
    </template>
  </Layout>
</template>

<script type="text/javascript">

import helpers from '@/services/helpers'
import Layout from '@/components/Layout'
import Paginate from 'vuejs-paginate'

export default {
  name: 'Author',
  components: {
    Layout,
    Paginate
  },
  async mounted () {
    if (this.$route.query.search !== undefined) {
      this.filters.search_content = this.$route.query.search
    }

    if (this.$route.query.page !== undefined) {
      this.filters.page = parseInt(this.$route.query.page)
    }

    let res = await this.$store.dispatch('fetchAuthorPosts', {
      name: this.$route.params.name,
      params: this.filters
    })

    this.posts = res.data
    this.pages = Math.ceil(res.meta.total / res.meta.size) || 0

    this.$store.dispatch('updateTitle', 'Author - ' + res.meta.author.name)
  },
  methods: {
    ...helpers,
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
      posts: [],
      filters: {
        page: 1,
        order: 'created_at',
        sort: 'desc'
      }
    }
  }
}

</script>
