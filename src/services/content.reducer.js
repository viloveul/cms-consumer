import initial from '@/services/content.initial'

export default (state = {...initial}, action) => {
  switch (action.type) {
    case 'FETCH_BLOG_POSTS_SUCCESS':
    case 'FETCH_AUTHOR_POSTS_SUCCESS':
    case 'FETCH_ARCHIVE_POSTS_SUCCESS':
      return {
        ...state,
        notify: action.type,
        posts: {...action.payload}
      }
    case 'FETCH_DETAIL_POST_SUCCESS':
      return {
        ...state,
        notify: action.type,
        post: {...action.payload.data}
      }
    case 'FETCH_COMMENTS_SUCCESS':
      return {
        ...state,
        notify: action.type,
        comments: {...action.payload}
      }
    case 'SEND_COMMENT_SUCCESS':
      return {
        ...state,
        notify: action.type
      }
    default:
      return {
        ...state,
        notify: ''
      }
  }
}
