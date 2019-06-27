import http from '@/http'

const fetchBlogPosts = (payload) => {
  return (dispatch) => {
    return http.get('/blog/index', {
      params: payload.params
    }).then(res => {
      dispatch(fetchBlogPostsSuccess(res.data))
    }).catch(e => {
      dispatch(fetchBlogPostsFailed(e))
    })
  }
}

const fetchBlogPostsSuccess = (data) => {
  return {
    type: 'FETCH_BLOG_POSTS_SUCCESS',
    payload: {...data}
  }
}

const fetchBlogPostsFailed = (message) => {
  return {
    type: 'FETCH_BLOG_POSTS_FAILED',
    payload: {
      message
    }
  }
}

const fetchArchivePosts = (payload) => {
  return (dispatch) => {
    return http.get('/blog/archive/' + payload.slug, {
      params: payload.params || {}
    }).then(res => {
      dispatch(fetchArchivePostsSuccess(res.data))
    }).catch(e => {
      dispatch(fetchArchivePostsFailed(e))
    })
  }
}

const fetchArchivePostsSuccess = (data) => {
  return {
    type: 'FETCH_ARCHIVE_POSTS_SUCCESS',
    payload: {...data}
  }
}

const fetchArchivePostsFailed = (message) => {
  return {
    type: 'FETCH_ARCHIVE_POSTS_FAILED',
    payload: {
      message
    }
  }
}

const fetchAuthorPosts = (payload) => {
  return (dispatch) => {
    return http.get('/blog/author/' + payload.name, {
      params: payload.params || {}
    }).then(res => {
      dispatch(fetchAuthorPostsSuccess(res.data))
    }).catch(e => {
      dispatch(fetchAuthorPostsFailed(e))
    })
  }
}

const fetchAuthorPostsSuccess = (data) => {
  return {
    type: 'FETCH_AUTHOR_POSTS_SUCCESS',
    payload: {...data}
  }
}

const fetchAuthorPostsFailed = (message) => {
  return {
    type: 'FETCH_AUTHOR_POSTS_FAILED',
    payload: {
      message
    }
  }
}

const fetchDetailPost = (payload) => {
  return (dispatch) => {
    return http.get('/blog/detail/' + payload.slug, {
      params: payload.params || {}
    }).then(res => {
      dispatch(fetchDetailPostSuccess(res.data))
    }).catch(e => {
      dispatch(fetchDetailPostFailed(e))
    })
  }
}

const fetchDetailPostSuccess = (data) => {
  return {
    type: 'FETCH_DETAIL_POST_SUCCESS',
    payload: {...data}
  }
}

const fetchDetailPostFailed = (message) => {
  return {
    type: 'FETCH_DETAIL_POST_FAILED',
    payload: {
      message
    }
  }
}

const fetchComments = (payload) => {
  return (dispatch) => {
    return http.get('/blog/comments/' + payload.postId, {
      params: payload.params
    }).then(res => {
      dispatch(fetchCommentsSuccess(res.data))
    }).catch(e => {
      dispatch(fetchCommentsFailed(e))
    })
  }
}

const fetchCommentsSuccess = (data) => {
  return {
    type: 'FETCH_COMMENTS_SUCCESS',
    payload: {...data}
  }
}

const fetchCommentsFailed = (message) => {
  return {
    type: 'FETCH_COMMENTS_FAILED',
    payload: {
      message
    }
  }
}

export default {
  fetchBlogPosts,
  fetchBlogPostsSuccess,
  fetchBlogPostsFailed,
  fetchArchivePosts,
  fetchArchivePostsSuccess,
  fetchArchivePostsFailed,
  fetchAuthorPosts,
  fetchAuthorPostsSuccess,
  fetchAuthorPostsFailed,
  fetchDetailPost,
  fetchDetailPostSuccess,
  fetchDetailPostFailed,
  fetchComments,
  fetchCommentsSuccess,
  fetchCommentsFailed
}