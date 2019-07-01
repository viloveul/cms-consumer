import React from 'react'
import qs from 'qs'
import Pagination from '@/components/Pagination'
import { connect } from 'react-redux'
import Layout from '@/partials/Layout'
import contentAction from '@/services/content.action'
import Post from '@/partials/Post'
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => {
  return {
    meta: state.content.posts.meta,
    data: state.content.posts.data,
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

  state = {
    page: 1,
    order: 'created_at',
    sort: 'desc',
    size: 10
  }

  componentDidMount = () => {
    let q = {}
    let page = this.state.page

    if (this.props.location.search.length > 1) {
      q = qs.parse(this.props.location.search.substr(1))
    }

    if (q.page !== undefined) {
      page = parseInt(q.page)
      this.setState({page})
    }

    let filters = {
      page: page || 1,
      order: this.state.order,
      sort: this.state.sort,
      size: this.state.size
    }

    if (this.props.match.params.day !== undefined) {
      filters.search_created_at = this.props.match.params.year + '-' + this.props.match.params.month + '-' + this.props.match.params.day
    } else if (this.props.match.params.month !== undefined) {
      filters.search_created_at = this.props.match.params.year + '-' + this.props.match.params.month + '-'
    } else if (this.props.match.params.year !== undefined) {
      filters.search_created_at = this.props.match.params.year + '-'
    }

    if (q.search !== undefined) {
      filters.search_content = q.search
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

        <Pagination currentPage={this.state.page} totalItems={this.props.meta.total} pageSize={this.state.size}></Pagination>
      </Layout>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog))
