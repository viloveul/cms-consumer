let curDate = new Date()
let dateFormated = curDate.getFullYear() + '-' + curDate.getMonth().toString().padStart(2, '0') + '-' + curDate.getDate().toString().padStart(2, '0')
let timeFormated = curDate.getHours().toString().padStart(2, '0') + ':' + curDate.getMinutes().toString().padStart(2, '0') + ':' + curDate.getSeconds().toString().padStart(2, '0')

export default {
  notify: '',
  posts: {
    meta: {
      order: 'id',
      page: 1,
      size: 10,
      sort: 'DESC',
      total: 0
    },
    data: []
  },
  tags: {
    meta: {
      order: 'id',
      page: 1,
      size: 10,
      sort: 'DESC',
      total: 0
    },
    data: []
  },
  tag: {
    id: '',
    parent_id: '',
    author_id: '',
    title: '',
    slug: '',
    type: 'tag',
    status: 1,
    created_at: dateFormated + ' ' + timeFormated,
    childs: []
  },
  post: {
    id: '',
    parent_id: '',
    author_id: '',
    title: '',
    cover: '',
    slug: '',
    type: 'post',
    description: '',
    content: '',
    status: 1,
    created_at: dateFormated + ' ' + timeFormated,
    comment_count: 0,
    comment_enabled: null,
    tags: [],
    author: {
      id: '',
      name: '',
      username: '',
      email: ''
    }
  },
  comments: {
    meta: {
      order: 'id',
      page: 1,
      size: 10,
      sort: 'DESC',
      total: 0
    },
    data: []
  },
  comment: {
    id: '',
    post_id: '',
    parent_id: '',
    author_id: '',
    name: '',
    nickname: '',
    email: '',
    website: '',
    content: '',
    status: 1,
    created_at: '',
    deleted_at: '',
    updated_at: '',
    post: {
      id: '',
      title: '',
      slug: '',
      type: 'post',
      description: ''
    },
    author: {
      id: '',
      name: '',
      nickname: '',
      email: ''
    }
  }
}