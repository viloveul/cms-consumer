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
      dispatch(contentAction.fetchBlogPosts(payload))
    }
  }
}

class Blog extends React.Component {

  componentDidMount = () => {

    let filters = {
      page: this.props.pagination.page,
      order: 'created_at',
      sort: 'desc',
      size: this.props.pagination.size
    }

    if (this.props.match.params.day !== undefined) {
      filters.search_created_at = this.props.match.params.year + '-' + this.props.match.params.month + '-' + this.props.match.params.day
    } else if (this.props.match.params.month !== undefined) {
      filters.search_created_at = this.props.match.params.year + '-' + this.props.match.params.month + '-'
    } else if (this.props.match.params.year !== undefined) {
      filters.search_created_at = this.props.match.params.year + '-'
    } else if (this.props.match.params.search !== undefined) {
      filters.search_content = this.props.match.params.search
    }

    this.props.fetchAll({
      params: {...filters}
    })
  }

  render = () => {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog))
