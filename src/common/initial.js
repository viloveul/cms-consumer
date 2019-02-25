export default {
  containerClasses: 'container',
  showNavbar: true,
  redirect: '/',
  me: {
    id: 0,
    picture: '',
    name: '',
    email: '',
    username: '',
    status: 0
  },
  privileges: [],
  options: {
    brand: 'Viloveul',
    description: 'Content Management System',
    email: 'me@viloveul.com',
    banner: '',
    contents: {
      posts: [
        {
          name: 'post',
          format: 'post',
          label: 'Post'
        },
        {
          name: 'page',
          format: 'page',
          label: 'Page'
        }
      ],
      tags: [
        {
          name: 'tag',
          format: 'tag',
          label: 'Post Tag'
        },
        {
          name: 'category',
          format: 'category',
          label: 'Category'
        }
      ],
      menus: [
        {
          name: 'navmenu',
          format: 'standar',
          label: 'Nav Menu'
        }
      ]
    },
    moderations: {
      user: true,
      post: true,
      comment: false
    }
  },
  widgets: {
    sidebar: []
  },
  breadcrumbs: [],
  errors: []
}
