import initial from '@/services/content.initial'

export default (state = {...initial}, action) => {
  switch (action.type) {
    case 'FETCH_BLOG_POSTS_SUCCESS':
    case 'FETCH_AUTHOR_POSTS_SUCCESS':
    case 'FETCH_ARCHIVE_POSTS_SUCCESS':
      return {
        ...state,
        posts: {...action.payload}
      }
    case 'FETCH_DETAIL_POST_SUCCESS':
      return {
        ...state,
        post: {...action.payload.data}
      }
    case 'FETCH_COMMENTS_SUCCESS':
      return {
        ...state,
        comments: {...action.payload}
      }
    default:
      return {...state}
  }
}
