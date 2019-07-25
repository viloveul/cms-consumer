import moment from 'moment'
import { store } from '@/store'

let getPostTags = (tags, type = 'tag') => {
  return tags.filter(tag => {
    return tag.type === type
  })
}

let getPermalink = (post) => {
  if (isFormatPost(post)) {
    return '/' + getPostFormatedDate(post, 'YYYY/MM/DD') + '/' + post.slug
  } else {
    return '/' + post.slug
  }
}

let getPostFormatedDate = (post, format = 'MMMM Do YYYY') => {
  let postDate = post.created_at !== undefined ? post.created_at : '2018-01-01 00:00:00'
  return moment(postDate, 'YYYY-MM-DD HH:mm:ss').format(format)
}

let getAuthorLink = (author) => {
  if (author !== null) {
    return '/@' + author.username
  } else {
    return '/@admin'
  }
}

let getTagLink = (tag) => {
  return '/' + tag.type + '/' + tag.slug + '.html'
}

let isFormatPost = (post) => {
  let state = store.getState()
  let types = [...state.site.options.contents.posts]
  for (let i = 0; i < types.length; i++) {
    if (types[i].name === post.type && types[i].format === 'post') {
      return true
    }
  }
  return false
}

export default {
  getPostTags,
  getPermalink,
  getPostFormatedDate,
  getAuthorLink,
  getTagLink,
  isFormatPost
}
