import React from 'react'
import Post from '@/partials/Post'
import { connect } from 'react-redux'
import Layout from '@/partials/Layout'
import Comment from '@/partials/Comment'
import contentAction from '@/services/content.action'
import contentHelper from '@/services/content.helper'

const mapStateToProps = state => {
  return {
    post: state.content.post,
    comments: state.content.comments.data
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
      this.props.fetchComments({
        postId: next.post.id,
        params: {}
      })
    }
  }

  render () {
    return (
      <Layout>
        <Post detail={this.props.post} isSingular={true}></Post>
        <div className="comment-list">
        {
          this.props.comments.map((comment, index) => {
            return <Comment detail={comment} key={index}></Comment>
          })
        }
        </div>
      </Layout>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Singular)
