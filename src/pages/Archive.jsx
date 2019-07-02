import qs from 'qs'
import React from 'react'
import Post from '@/partials/Post'
import { connect } from 'react-redux'
import Layout from '@/partials/Layout'
import { withRouter } from 'react-router-dom'
import Pagination from '@/components/Pagination'
import contentAction from '@/services/content.action'

const mapStateToProps = state => {
  return {
    meta: state.content.posts.meta,
    data: state.content.posts.data
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAll: (payload) => {
      dispatch(contentAction.fetchArchivePosts(payload))
    }
  }
}

class Archive extends React.Component {

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

    this.props.fetchAll({
      slug: this.props.match.params.slug,
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

        <Pagination currentPage={this.state.page} totalItems={this.props.meta.total} pageSize={this.state.size}></Pagination>
      </Layout>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Archive))
