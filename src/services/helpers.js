export default {
  getPostTags: (tags, type = 'tag') => {
    return tags.filter(tag => {
      return tag.type === type
    })
  },
  getPermalink: (post) => {
    return '/' + post.slug
  },
  getAuthorLink: (author) => {
    if (author !== null) {
      return '/@' + author.username
    } else {
      return '/@admin'
    }
  },
  getTagLink: (tag) => {
    return '/' + tag.type + '/' + tag.slug
  }
}
