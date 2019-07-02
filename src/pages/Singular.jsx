import qs from 'qs'
import React from 'react'
import Post from '@/partials/Post'
import { connect } from 'react-redux'
import Layout from '@/partials/Layout'
import Comment from '@/partials/Comment'
import CommentForm from '@/components/Comment'
import Pagination from '@/components/Pagination'
import contentAction from '@/services/content.action'
import contentHelper from '@/services/content.helper'

const mapStateToProps = state => {
  return {
    post: state.content.post,
    data: state.content.comments.data,
    meta: state.content.comments.meta
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDetail: (slug) => {
      dispatch(contentAction.fetchDetailPost({slug}))
    },
    fetchComments: (payload) => {
      dispatch(contentAction.fetchComments(payload))
    }
  }
}

class Singular extends React.Component {

  state = {
    page: 1,
    order: 'created_at',
    sort: 'desc'
  }

  componentDidMount = () => {
    let paths = this.props.location.pathname.split('/')
    this.props.fetchDetail(paths.pop())
  }

  componentWillReceiveProps = (next) => {
    if (this.props.post.id !== next.post.id && parseInt(next.post.comment_enabled) === 1 && contentHelper.isFormatPost(next.post) === true) {

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
      this.props.fetchComments({
        postId: next.post.id,
        params: {...filters}
      })
    }
  }

  render () {
    return (
      <Layout>
        <Post detail={this.props.post} isSingular={true}></Post>
        <div className="comment-list">
        {
          this.props.data.map((comment, index) => {
            return <Comment detail={comment} key={index}></Comment>
          })
        }
        </div>
        <Pagination currentPage={this.state.page} totalItems={this.props.meta.total} pageSize={this.state.size}></Pagination>
        <CommentForm postId={this.props.post.id}></CommentForm>
      </Layout>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Singular)
