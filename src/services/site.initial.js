export default {
  options: {
    brand: 'My Site',
    description: 'Just another simple site',
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
  widgets: [],
  menus: [
    {
      label: 'Home',
      url: '/'
    },
    {
      label: 'Components',
      url: 'https://viloveul.github.io'
    }
  ],
  breadcrumbs: [],
  errors: [],
  pagination: {
    page: 1,
    size: 10
  }
}