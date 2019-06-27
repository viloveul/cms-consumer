import React from 'react'
import qs from 'qs'
import { connect } from 'react-redux'
import Layout from '@/partials/Layout'
import contentAction from '@/services/content.action'
import Post from '@/partials/Post'

const mapStateToProps = state => {
  return {
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

  state = {
    page: 1,
    order: 'created_at',
    sort: 'desc'
  }

  componentDidMount = () => {
    let filters = {
        page: this.state.page,
        order: this.state.order,
        sort: this.state.sort
    }

    if (this.props.match.params.day !== undefined) {
      filters.search_created_at = this.props.match.params.year + '-' + this.props.match.params.month + '-' + this.props.match.params.day
    } else if (this.props.match.params.month !== undefined) {
      filters.search_created_at = this.props.match.params.year + '-' + this.props.match.params.month + '-'
    } else if (this.props.match.params.year !== undefined) {
      filters.search_created_at = this.props.match.params.year + '-'
    }

    if (this.props.location.search.length > 1) {
      let paths = qs.parse(this.props.location.search.substr(1))
      if (paths.search !== undefined) {
        filters.search_content = paths.search
      }
    }

    this.props.fetchAll({
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
      </Layout>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)
