import React from 'react'
import Post from '@/partials/Post'
import { connect } from 'react-redux'
import Layout from '@/partials/Layout'
import { withRouter } from 'react-router-dom'
import Pagination from '@/components/Pagination'
import contentAction from '@/services/content.action'

const mapStateToProps = state => {
  return {
    pagination: state.site.pagination,
    meta: state.content.posts.meta,
    data: state.content.posts.data
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAll: (payload) => {
      dispatch(contentAction.fetchAuthorPosts(payload))
    }
  }
}

class Author extends React.Component {

  componentDidMount = () => {

    let filters = {
      page: this.props.pagination.page,
      order: 'created_at',
      sort: 'desc',
      size: this.props.pagination.size
    }

    this.props.fetchAll({
      name: this.props.match.params.name,
      params: {...filters}
    })
  }

  render () {
    return (
      <Layout>
        {
          this.props.data.map((post, index) => {
            return <Post key={index} detail={post}></Post>
          })
        }

        <Pagination currentPage={this.props.pagination.page} totalItems={this.props.meta.total} pageSize={this.props.pagination.size}></Pagination>
      </Layout>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Author))
